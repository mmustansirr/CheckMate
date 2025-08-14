import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { PredictionRequest } from '@/types';

export const usePrediction = () => {
  return useMutation({
    mutationFn: (request: PredictionRequest) => apiClient.predict(request),
    retry: 1,
  });
};

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.healthCheck(),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};
