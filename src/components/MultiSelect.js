import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ZEN_HEALING } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * MultiSelect component for selecting multiple items
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of items with id and name properties
 * @param {Array} props.selectedItems - Array of selected item ids
 * @param {Function} props.onSelectionChange - Callback when selection changes
 * @param {String} props.placeholder - Placeholder text when no items are selected
 * @param {String} props.title - Title for the modal
 * @param {Boolean} props.error - Whether there is an error with the selection
 */
const MultiSelect = ({
  items = [],
  selectedItems = [],
  onSelectionChange,
  placeholder = 'Select items',
  title = 'Select Items',
  error = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Toggle item selection
  const toggleItem = (itemId) => {
    let newSelectedItems;
    if (selectedItems.includes(itemId)) {
      newSelectedItems = selectedItems.filter(id => id !== itemId);
    } else {
      newSelectedItems = [...selectedItems, itemId];
    }
    onSelectionChange(newSelectedItems);
  };

  // Get selected items text
  const getSelectedItemsText = () => {
    if (selectedItems.length === 0) {
      return placeholder;
    }
    
    const selectedNames = items
      .filter(item => selectedItems.includes(item.id))
      .map(item => item.name);
    
    if (selectedNames.length <= 2) {
      return selectedNames.join(', ');
    }
    
    return `${selectedNames.length} items selected`;
  };

  return (
    <>
      <TouchableOpacity 
        style={[
          styles.selectContainer, 
          error && styles.selectContainerError
        ]} 
        onPress={() => setModalVisible(true)}
      >
        <Text 
          style={[
            styles.selectText,
            selectedItems.length === 0 && styles.placeholderText
          ]}
          numberOfLines={1}
        >
          {getSelectedItemsText()}
        </Text>
        <Ionicons name="chevron-down" size={20} color={ZEN_HEALING.COLORS.TEXT.SECONDARY} />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color={ZEN_HEALING.COLORS.TEXT.PRIMARY} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.itemContainer}
                  onPress={() => toggleItem(item.id)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  <View style={styles.checkbox}>
                    {selectedItems.includes(item.id) && (
                      <Ionicons 
                        name="checkmark" 
                        size={16} 
                        color={ZEN_HEALING.COLORS.PRIMARY} 
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No items available</Text>
              )}
            />
            
            <TouchableOpacity 
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.SECONDARY,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    borderRadius: 8,
  },
  selectContainerError: {
    borderColor: ZEN_HEALING.COLORS.ERROR,
  },
  selectText: {
    flex: 1,
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  placeholderText: {
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: ZEN_HEALING.COLORS.BORDER,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  closeButton: {
    padding: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: ZEN_HEALING.COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.PRIMARY,
  },
  separator: {
    height: 1,
    backgroundColor: ZEN_HEALING.COLORS.BORDER,
    marginLeft: 16,
  },
  emptyText: {
    padding: 16,
    textAlign: 'center',
    color: ZEN_HEALING.COLORS.TEXT.SECONDARY,
  },
  doneButton: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: ZEN_HEALING.COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MultiSelect; 