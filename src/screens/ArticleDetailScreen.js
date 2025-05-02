import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Share,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useArticles from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';

const { width } = Dimensions.get('window');

const ArticleDetailScreen = ({ navigation, route }) => {
  const { articleId } = route.params || {};
  const { fetchArticleById, articles, loading, error } = useArticles();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  // Fetch article details when the screen loads
  useEffect(() => {
    const loadArticle = async () => {
      if (articleId) {
        const data = await fetchArticleById(articleId);
        if (data) {
          setArticle(data);
        }
      }
    };
    
    loadArticle();
  }, [articleId, fetchArticleById]);
  
  // Find related articles when article is loaded
  useEffect(() => {
    if (article && articles.length > 0) {
      // Get articles in the same category
      const sameCategory = articles.filter(a => 
        a.id !== article.id && 
        a.category === article.category
      );
      
      // If not enough, add other articles
      let related = [...sameCategory];
      if (related.length < 3) {
        const others = articles.filter(a => 
          a.id !== article.id && 
          !sameCategory.includes(a)
        );
        related = [...related, ...others].slice(0, 3);
      } else {
        related = related.slice(0, 3);
      }
      
      setRelatedArticles(related);
    }
  }, [article, articles]);
  
  // Go back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Share article
  const handleShare = async () => {
    if (!article) return;
    
    try {
      await Share.share({
        title: article.title,
        message: `Check out this article: ${article.title}\n\n${article.excerpt}\n\nRead more on Zen Healing App`
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };
  
  // Navigate to another article
  const handleArticlePress = (selectedArticle) => {
    navigation.push('ArticleDetailScreen', { articleId: selectedArticle.id });
  };
  
  // Render loading state
  if (loading || !article) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButtonAbsolute}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
          </View>
        </TouchableOpacity>
        <ActivityIndicator size="large" color={ZEN_HEALING.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading article...</Text>
      </SafeAreaView>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <View style={styles.errorContent}>
          <Ionicons name="alert-circle" size={64} color={ZEN_HEALING.COLORS.ERROR} />
          <Text style={styles.errorText}>Failed to load article</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchArticleById(articleId)}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={
              article.image_url 
                ? { uri: article.image_url } 
                : require('../../assets/welcome.png')
            } 
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Back Button (Absolute) */}
          <TouchableOpacity onPress={handleGoBack} style={styles.backButtonAbsolute}>
            <View style={styles.backButtonCircle}>
              <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
            </View>
          </TouchableOpacity>
          
          {/* Share Button (Absolute) */}
          <TouchableOpacity onPress={handleShare} style={styles.shareButtonAbsolute}>
            <View style={styles.shareButtonCircle}>
              <Ionicons name="share-social" size={22} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
            </View>
          </TouchableOpacity>
          
          {/* Category Badge */}
          {article.category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{article.category}</Text>
            </View>
          )}
        </View>
        
        {/* Article Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{article.title}</Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.date}>{article.date || article.published_at}</Text>
            <View style={styles.readTimeContainer}>
              <Ionicons name="time-outline" size={12} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
              <Text style={styles.readTime}>{article.read_time || 5} min read</Text>
            </View>
          </View>
          
          {article.author && (
            <View style={styles.authorContainer}>
              <View style={styles.authorAvatar}>
                <Text style={styles.authorInitials}>
                  {article.author.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <Text style={styles.authorName}>By {article.author}</Text>
            </View>
          )}
          
          <Text style={styles.content}>
            {article.content || article.body || article.excerpt + '\n\n' + generatePlaceholderContent()}
          </Text>
          
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <View style={styles.relatedContainer}>
              <Text style={styles.relatedTitle}>Related Articles</Text>
              
              {relatedArticles.map((relatedArticle, index) => (
                <ArticleCard
                  key={index}
                  title={relatedArticle.title}
                  excerpt={relatedArticle.excerpt}
                  date={relatedArticle.date || relatedArticle.published_at}
                  imageUri={relatedArticle.image_url}
                  category={relatedArticle.category}
                  readTime={relatedArticle.read_time || 5}
                  onPress={() => handleArticlePress(relatedArticle)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to generate placeholder content if needed
const generatePlaceholderContent = () => {
  return `Holistic health approaches have gained significant popularity in recent years, as more people seek natural ways to improve their well-being. These approaches consider the whole person—body, mind, spirit, and emotions—in the quest for optimal health.

Unlike conventional medicine, which often focuses on treating specific symptoms or diseases, holistic healing aims to achieve balance across all aspects of a person's life. This may involve various practices such as nutrition, exercise, meditation, and various other complementary therapies.

One key concept in holistic health is that the whole is greater than the sum of its parts. This means that what affects one part of your body affects your entire being. For example, a physical illness might cause emotional distress, while emotional problems might manifest as physical symptoms.

Many holistic practitioners believe that the body has an innate healing ability and can heal itself given the right conditions. These practitioners work as guides, helping individuals tap into their body's natural healing potential.

Several common holistic health practices include:

- Acupuncture: An ancient Chinese medicine practice that involves inserting thin needles into specific points on the body to balance energy flow.
- Naturopathy: A form of alternative medicine that employs an array of pseudoscientific practices branded as "natural," "non-invasive," and promoting "self-healing."
- Mind-body therapies: Including yoga, tai chi, meditation, and breathwork, which aim to strengthen the connection between mind and body.
- Nutrition and dietary interventions: Such as eating a balanced diet, avoiding processed foods, and sometimes using specific diets to address particular health concerns.
- Herbal medicine: Using plants and plant extracts to improve health and treat various conditions.

While traditional medicine has its place, holistic approaches remind us of the importance of looking at the bigger picture when it comes to health. By considering how various factors interrelate and affect our well-being, holistic health offers a comprehensive approach to living well.`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    width: width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButtonAbsolute: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shareButtonAbsolute: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  shareButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginLeft: 4,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.PRIMARY,
  },
  authorName: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 20,
  },
  relatedContainer: {
    marginTop: 20,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  backButton: {
    padding: 16,
  },
  errorContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.ERROR,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default ArticleDetailScreen; 