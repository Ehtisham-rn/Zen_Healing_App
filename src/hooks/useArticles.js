import { useState, useEffect, useCallback } from 'react';
import zenHealingApi from '../services/zenHealingApi';

// Mock data for fallback when API fails
const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Benefits of Mindfulness Meditation',
    excerpt: 'Discover how daily mindfulness practice can reduce stress and improve overall well-being.',
    date: 'June 15, 2023',
    category: 'Meditation',
    read_time: 5,
    image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    title: 'Holistic Approaches to Stress Management',
    excerpt: 'Learn about natural techniques to manage stress and anxiety without medication.',
    date: 'June 10, 2023',
    category: 'Wellness',
    read_time: 7,
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    title: 'The Power of Nutritional Healing',
    excerpt: 'How changing your diet can help address chronic health issues and boost your immune system.',
    date: 'May 28, 2023',
    category: 'Nutrition',
    read_time: 6,
    image_url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bnV0cml0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
  }
];

/**
 * Custom hook to fetch and manage articles
 * @returns {Object} Articles data and related functions
 */
const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articleDetails, setArticleDetails] = useState({});

  /**
   * Fetch all articles from the API
   */
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if zenHealingApi and articles property exist
      if (!zenHealingApi || !zenHealingApi.articles) {
        console.error('API service not properly initialized');
        throw new Error('API service not properly initialized');
      }
      
      const response = await zenHealingApi.articles.getAll();
      if (response && response.data) {
        setArticles(response.data);
        
        // Set first 2-3 articles as featured
        const featured = response.data.slice(0, 3);
        setFeaturedArticles(featured);
      } else {
        // Fallback to mock data if response is empty
        console.warn('Empty API response for articles, using mock data');
        setArticles(MOCK_ARTICLES);
        setFeaturedArticles(MOCK_ARTICLES);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message || 'Failed to load articles');
      
      // Fallback to mock data on error
      console.warn('Using mock article data due to API error');
      setArticles(MOCK_ARTICLES);
      setFeaturedArticles(MOCK_ARTICLES);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a single article by ID
   * @param {string|number} articleId - The ID of the article to fetch
   * @returns {Promise<Object>} The article data
   */
  const fetchArticleById = useCallback(async (articleId) => {
    if (!articleId) return null;
    
    // Check if already loaded in articleDetails
    if (articleDetails[articleId]) {
      return articleDetails[articleId];
    }
    
    // Check for mock data first
    const mockArticle = MOCK_ARTICLES.find(a => a.id === articleId);
    if (mockArticle) {
      setArticleDetails(prev => ({
        ...prev,
        [articleId]: mockArticle
      }));
      return mockArticle;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Check if zenHealingApi and articles property exist
      if (!zenHealingApi || !zenHealingApi.articles) {
        console.error('API service not properly initialized');
        throw new Error('API service not properly initialized');
      }
      
      const response = await zenHealingApi.articles.getById(articleId);
      if (response && response.data) {
        // Save in the article details cache
        setArticleDetails(prev => ({
          ...prev,
          [articleId]: response.data
        }));
        return response.data;
      }
      return null;
    } catch (err) {
      console.error(`Error fetching article #${articleId}:`, err);
      setError(err.message || 'Failed to load article details');
      return null;
    } finally {
      setLoading(false);
    }
  }, [articleDetails]);

  // Initialize articles when the hook is first used
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    featuredArticles,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    articleDetails
  };
};

export default useArticles; 