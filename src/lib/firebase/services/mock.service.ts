import { mockStore } from '../../mock/mockData';
import { toast } from 'react-hot-toast';
import type { FirestoreUser, FirestoreRecommendation } from '../collections';

export const mockUserService = {
  async getUser(userId: string): Promise<FirestoreUser | null> {
    try {
      const user = mockStore.getUser(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user';
      console.error('Error fetching user:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  async createUser(userId: string, userData: Omit<FirestoreUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    mockStore.createUser(userId, userData);
  },

  async updateUser(userId: string, updates: Partial<FirestoreUser>): Promise<void> {
    mockStore.updateUser(userId, updates);
  }
};

export const mockRecommendationService = {
  async createRecommendation(data: Omit<FirestoreRecommendation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return mockStore.createRecommendation(data);
  },

  async getRecommendation(id: string): Promise<FirestoreRecommendation | null> {
    return mockStore.getRecommendation(id);
  },

  async getUserRecommendations(userId: string, status?: 'pending' | 'approved' | 'rejected'): Promise<{
    recommendations: FirestoreRecommendation[];
    lastDoc: null;
    hasMore: false;
  }> {
    const recommendations = mockStore.getUserRecommendations(userId, status);
    return {
      recommendations,
      lastDoc: null,
      hasMore: false
    };
  },

  async updateRecommendationStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    mockStore.updateRecommendationStatus(id, status);
  }
};