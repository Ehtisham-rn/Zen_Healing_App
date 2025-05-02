import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useArticles from '../hooks/useArticles';
import ArticleCard from '../components/ArticleCard';

const ArticlesScreen = ({ navigation }) => {
  const { articles, loading, error, fetchArticles } = useArticles();
  
  // State for filtered articles
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Filter articles based on search and category
  useEffect(() => {
    if (articles.length > 0) {
      let filtered = [...articles];
      
      // Apply search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) || 
          (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
          (article.category && article.category.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (activeCategory) {
        filtered = filtered.filter(article => 
          article.category && article.category.toLowerCase() === activeCategory.toLowerCase()
        );
      }
      
      setFilteredArticles(filtered);
    }
  }, [articles, searchQuery, activeCategory]);
  
  // Extract unique categories
  const categories = articles.length > 0 
    ? [...new Set(articles.map(article => article.category))]
    : [];
  
  // Clear active category
  const handleClearCategory = () => {
    setActiveCategory(null);
  };
  
  // Go back to previous screen
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Navigate to article details
  const handleArticlePress = (article) => {
    navigation.navigate('ArticleDetailScreen', { articleId: article.id });
  };

  // Render empty state
  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={ZEN_HEALING.COLORS.PRIMARY} />
          <Text style={styles.emptyText}>Loading articles...</Text>
        </View>
      );
    }
    
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle" size={64} color={ZEN_HEALING.COLORS.ERROR} />
          <Text style={styles.emptyText}>Failed to load articles</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchArticles}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="newspaper-outline" size={64} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
        <Text style={styles.emptyText}>No articles found</Text>
        {(searchQuery.trim() !== '' || activeCategory) && (
          <Text style={styles.emptySubtext}>
            Try adjusting your search criteria or removing filters
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wellness Articles</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={ZEN_HEALING.COLORS.TEXT.SECONDARY} 
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          placeholderTextColor={ZEN_HEALING.COLORS.TEXT.SECONDARY}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.trim() !== '' && (
          <TouchableOpacity 
            style={styles.clearSearch} 
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Categories Horizontal Scroll */}
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  activeCategory === category && styles.activeCategoryChip
                ]}
                onPress={() => setActiveCategory(category === activeCategory ? null : category)}
              >
                <Text 
                  style={[
                    styles.categoryChipText,
                    activeCategory === category && styles.activeCategoryChipText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {activeCategory && (
            <TouchableOpacity 
              style={styles.clearCategoryButton}
              onPress={handleClearCategory}
            >
              <Ionicons name="close-circle" size={18} color={ZEN_HEALING.COLORS.PRIMARY} />
              <Text style={styles.clearCategoryText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {/* Results Count */}
      {filteredArticles.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsCount}>
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
          </Text>
        </View>
      )}
      
      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <ArticleCard 
            title={item.title}
            excerpt={item.excerpt}
            date={item.date || item.published_at}
            imageUri={item.image_url}
            category={item.category}
            readTime={item.read_time || 5}
            onPress={() => handleArticlePress(item)}
          />
        )}
        contentContainerStyle={styles.articlesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginLeft: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderRadius: 12,
    paddingHorizontal: 16,
    margin: 16,
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    fontSize: 16,
  },
  clearSearch: {
    padding: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  categoriesList: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    marginRight: 10,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
  },
  activeCategoryChip: {
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY + '20',
    borderColor: ZEN_HEALING.COLORS.PRIMARY,
  },
  categoryChipText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  activeCategoryChipText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    fontWeight: '500',
  },
  clearCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  clearCategoryText: {
    color: ZEN_HEALING.COLORS.PRIMARY,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    fontWeight: '500',
  },
  articlesList: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: ZEN_HEALING.COLORS.ERROR,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default ArticlesScreen; 