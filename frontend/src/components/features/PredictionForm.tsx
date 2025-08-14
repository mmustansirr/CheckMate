'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { usePrediction } from '@/hooks/usePrediction';
import { PredictionResponse } from '@/types';

const predictionSchema = z.object({
  headline: z
    .string()
    .min(10, 'Headline must be at least 10 characters long')
    .max(500, 'Headline must be less than 500 characters')
    .refine((val) => val.trim().split(' ').length >= 3, {
      message: 'Headline must contain at least 3 words',
    }),
});

type PredictionFormData = z.infer<typeof predictionSchema>;

interface PredictionResultProps {
  result: PredictionResponse;
}

function PredictionResult({ result }: PredictionResultProps) {
  const isReal = result.label === 'real';
  const confidence = Math.round(result.score * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Card className={`border-2 ${isReal ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isReal ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600" />
              )}
              <div>
                <CardTitle className={`text-lg ${isReal ? 'text-green-800' : 'text-red-800'}`}>
                  {isReal ? 'Likely Real News' : 'Likely Fake News'}
                </CardTitle>
                <CardDescription>
                  Confidence: {confidence}%
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant={isReal ? 'default' : 'destructive'}
              className="text-sm font-semibold"
            >
              {result.label.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Confidence Level</span>
                <span>{confidence}%</span>
              </div>
              <Progress 
                value={confidence} 
                className={`h-2 ${isReal ? '[&>div]:bg-green-600' : '[&>div]:bg-red-600'}`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Real News:</span>
                  <span className="font-medium">{Math.round(result.probs.real * 100)}%</span>
                </div>
                <Progress 
                  value={result.probs.real * 100} 
                  className="h-1 [&>div]:bg-green-500"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fake News:</span>
                  <span className="font-medium">{Math.round(result.probs.fake * 100)}%</span>
                </div>
                <Progress 
                  value={result.probs.fake * 100} 
                  className="h-1 [&>div]:bg-red-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PredictionForm() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const prediction = usePrediction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PredictionFormData>({
    resolver: zodResolver(predictionSchema),
  });

  const headlineValue = watch('headline', '');
  const wordCount = headlineValue.trim().split(' ').filter(Boolean).length;

  const onSubmit = async (data: PredictionFormData) => {
    try {
      const response = await prediction.mutateAsync(data);
      setResult(response);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fact-Check Your News
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Enter a news headline to check if it&apos;s real or fake using AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-sm font-medium">
                  News Headline
                </Label>
                <Textarea
                  id="headline"
                  placeholder="Enter the news headline you want to fact-check..."
                  className="min-h-[120px] resize-none border-2 focus:border-blue-500 transition-colors"
                  {...register('headline')}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {wordCount} word{wordCount !== 1 ? 's' : ''} • Min 3 words required
                  </span>
                  <span>{headlineValue.length}/500</span>
                </div>
                <AnimatePresence>
                  {errors.headline && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{errors.headline.message}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={prediction.isPending}
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {prediction.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Check Headline
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {prediction.error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {prediction.error instanceof Error 
                  ? prediction.error.message 
                  : 'An error occurred while checking the headline'}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <PredictionResult result={result} />
        )}
      </AnimatePresence>
    </div>
  );
}
