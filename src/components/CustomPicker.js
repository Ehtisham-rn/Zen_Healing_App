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
 * Custom Picker Component
 * A reliable alternative to the React Native Picker with better UI
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of items with id and name properties
 * @param {string|number} props.selectedValue - Currently selected value (id)
 * @param {Function} props.onValueChange - Function to call when value changes
 * @param {String} props.placeholder - Placeholder text when no item is selected
 * @param {String} props.title - Title for the modal
 * @param {Boolean} props.error - Whether there is an error with the selection
 * @param {Boolean} props.enabled - Whether the picker is enabled
 */
const CustomPicker = ({
  items = [],
  selectedValue = '',
  onValueChange,
  placeholder = 'Select an item',
  title = 'Select Item',
  error = false,
  enabled = true,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Get the selected item's name
  const getSelectedItemName = () => {
    if (!selectedValue) {
      return placeholder;
    }
    
    const selectedItem = items.find(item => String(item.id) === String(selectedValue));
    return selectedItem ? selectedItem.name : placeholder;
  };
  
  // Handle item selection
  const handleSelectItem = (itemValue) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };
  
  return (
    <>
      <TouchableOpacity 
        style={[
          styles.selectContainer, 
          error && styles.selectContainerError,
          !enabled && styles.selectContainerDisabled
        ]} 
        onPress={() => enabled && setModalVisible(true)}
        disabled={!enabled}
      >
        <Text 
          style={[
            styles.selectText,
            !selectedValue && styles.placeholderText,
            !enabled && styles.selectTextDisabled
          ]}
          numberOfLines={1}
        >
          {getSelectedItemName()}
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={enabled ? ZEN_HEALING.COLORS.TEXT.SECONDARY : ZEN_HEALING.COLORS.TEXT.TERTIARY} 
        />
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
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.itemContainer,
                    String(item.id) === String(selectedValue) && styles.selectedItemContainer
                  ]}
                  onPress={() => handleSelectItem(String(item.id))}
                >
                  <Text 
                    style={[
                      styles.itemText,
                      String(item.id) === String(selectedValue) && styles.selectedItemText
                    ]}
                  >
                    {item.name}
                  </Text>
                  {String(item.id) === String(selectedValue) && (
                    <Ionicons 
                      name="checkmark" 
                      size={20} 
                      color={ZEN_HEALING.COLORS.PRIMARY} 
                    />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>No items available</Text>
              )}
            />
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
  selectContainerDisabled: {
    backgroundColor: ZEN_HEALING.COLORS.BACKGROUND.TERTIARY,
    borderColor: ZEN_HEALING.COLORS.BORDER,
  },
  selectText: {
    flex: 1,
    fontSize: 15,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  selectTextDisabled: {
    color: ZEN_HEALING.COLORS.TEXT.TERTIARY,
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
    maxHeight: '70%',
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
  selectedItemContainer: {
    backgroundColor: `${ZEN_HEALING.COLORS.PRIMARY}10`,
  },
  itemText: {
    fontSize: 16,
    color: ZEN_HEALING.COLORS.TEXT.PRIMARY,
  },
  selectedItemText: {
    fontWeight: '600',
    color: ZEN_HEALING.COLORS.PRIMARY,
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
  }
});

export default CustomPicker; 