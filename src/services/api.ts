import { mockStore } from '../data/mockData';
import { toast } from 'react-hot-toast';
import type { FirestoreUser, FirestoreRecommendation } from '../lib/firebase/collections';

export const userApi = {
  async getUserById(userId: string): Promise<FirestoreUser> {
    try {
      const user = mockStore.getUser(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user profile');
      throw error;
    }
  },

  async updateUser(userId: string, updates: Partial<FirestoreUser>): Promise<void> {
    try {
      mockStore.updateUser(userId, updates);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      throw error;
    }
  }
};

export const recommendationApi = {
  async createRecommendation(data: Omit<FirestoreRecommendation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      return mockStore.createRecommendation(data);
    } catch (error) {
      console.error('Error creating recommendation:', error);
      toast.error('Failed to create recommendation');
      throw error;
    }
  },

  async getRecommendation(id: string): Promise<FirestoreRecommendation | null> {
    try {
      return mockStore.getRecommendation(id);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      toast.error('Failed to load recommendation');
      throw error;
    }
  },

  async getUserRecommendations(userId: string, status?: string): Promise<{
    recommendations: FirestoreRecommendation[];
    lastDoc: null;
    hasMore: false;
  }> {
    try {
      const recommendations = mockStore.getUserRecommendations(userId, status);
      return {
        recommendations,
        lastDoc: null,
        hasMore: false
      };
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to load recommendations');
      throw error;
    }
  },

  async updateRecommendationStatus(id: string, status: 'approved' | 'rejected'): Promise<void> {
    try {
      mockStore.updateRecommendationStatus(id, status);
    } catch (error) {
      console.error('Error updating recommendation status:', error);
      toast.error('Failed to update recommendation status');
      throw error;
    }
  }
};

export const api = {
  users: userApi,
  recommendations: recommendationApi
};