import JapaCounter from '@/components/JapaCounter';
import MonthYearPickerModal from '@/components/MonthYearPickerModal';
import { JapaSession, RecitationLog, StorageService } from '@/services/StorageService';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, LayoutAnimation, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type HistoryTab = 'japa' | 'recitations';

export default function JapaScreen() {
  const [activeTab, setActiveTab] = useState<HistoryTab>('japa');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allJapaHistory, setAllJapaHistory] = useState<JapaSession[]>([]);
  const [allRecitationHistory, setAllRecitationHistory] = useState<RecitationLog[]>([]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const loadAllHistory = async () => {
    const japaData = await StorageService.getJapaHistory();
    const recitationData = await StorageService.getRecitationLogs();
    setAllJapaHistory(japaData);
    setAllRecitationHistory(recitationData);
  };

  useFocusEffect(useCallback(() => { loadAllHistory(); }, []));

  const filteredHistory = useMemo(() => {
    const targetMonth = currentDate.getMonth();
    const targetYear = currentDate.getFullYear();

    if (activeTab === 'japa') {
      return allJapaHistory.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear;
      });
    } else {
      return allRecitationHistory.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear;
      });
    }
  }, [activeTab, currentDate, allJapaHistory, allRecitationHistory]);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };
  
  const handleDateSelect = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleDeleteJapa = (item: JapaSession) => {
    Alert.alert("Delete Japa Log", `Delete the log of ${item.malas} mālā(s) from ${new Date(item.date).toLocaleDateString()}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          await StorageService.deleteJapaSession(item.date);
          loadAllHistory();
        }},
    ]);
  };

  const handleDeleteRecitation = (item: RecitationLog) => {
    Alert.alert("Delete Recitation Log", `Delete the log of ${item.count} recitation(s) of "${item.stotraTitle}"?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: async () => {
            await StorageService.deleteRecitationLog(item.date);
            loadAllHistory();
        }},
    ]);
  };

  const toggleHistoryExpansion = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
        duration: 200,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.8,
      },
    });
    setIsHistoryExpanded(!isHistoryExpanded);
  };

  const formattedDate = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Dynamic Japa Counter Section */}
      <View style={[
        styles.counterSection, 
        isHistoryExpanded ? styles.counterSectionCompact : styles.counterSectionExpanded
      ]}>
        <JapaCounter 
          onJapaSaved={loadAllHistory} 
          isCompact={isHistoryExpanded}
        />
      </View>
      
      {/* Collapsible History Section */}
      <View style={[
        styles.historySection,
        isHistoryExpanded ? styles.historySectionExpanded : styles.historySectionCollapsed
      ]}>
        {/* History Header - Always Visible */}
        <TouchableOpacity 
          style={styles.historyHeader} 
          onPress={toggleHistoryExpansion}
          activeOpacity={0.7}
        >
          <Text style={styles.mainHistoryTitle}>Practice History</Text>
          <Ionicons 
            name={isHistoryExpanded ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#FF6D00" 
          />
        </TouchableOpacity>

        {/* Expandable History Content */}
        {isHistoryExpanded && (
          <>
            <View style={styles.monthNavigator}>
              <TouchableOpacity onPress={() => handleMonthChange('prev')} style={styles.arrowButton}>
                <Ionicons name="chevron-back" size={24} color="#FF6D00" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPickerVisible(true)}>
                <Text style={styles.monthText}>{formattedDate}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMonthChange('next')} style={styles.arrowButton}>
                <Ionicons name="chevron-forward" size={24} color="#FF6D00" />
              </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'japa' && styles.activeTab]} 
                onPress={() => setActiveTab('japa')}>
                <Text style={[styles.tabText, activeTab === 'japa' && styles.activeTabText]}>Japa</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'recitations' && styles.activeTab]} 
                onPress={() => setActiveTab('recitations')}>
                <Text style={[styles.tabText, activeTab === 'recitations' && styles.activeTabText]}>Recitations</Text>
              </TouchableOpacity>
            </View>
            
            {/* History List */}
            <View style={styles.listContainer}>
              <FlatList 
                data={filteredHistory} 
                keyExtractor={(item) => item.date}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                      No {activeTab} logged for {formattedDate}.
                    </Text>
                  </View>
                } 
                renderItem={({ item }) => (
                  activeTab === 'japa' ? (
                    <View style={styles.historyItem}>
                      <View style={styles.historyItemContent}>
                        <Text style={styles.historyText}>{(item as JapaSession).malas} mālā(s)</Text>
                        <Text style={styles.historyDate}>{new Date(item.date).toLocaleString()}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDeleteJapa(item as JapaSession)} style={styles.deleteButton}>
                        <Ionicons name="trash-bin-outline" size={20} color="#888" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.historyItem}>
                      <View style={styles.historyItemContent}>
                        <Text style={styles.historyText} numberOfLines={1} ellipsizeMode='tail'>
                          {(item as RecitationLog).stotraTitle}
                        </Text>
                        <Text style={styles.historyDate}>
                          {(item as RecitationLog).count} time(s) on {new Date(item.date).toLocaleDateString()}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDeleteRecitation(item as RecitationLog)} style={styles.deleteButton}>
                        <Ionicons name="trash-bin-outline" size={20} color="#888" />
                      </TouchableOpacity>
                    </View>
                  )
                )} 
              />
            </View>
          </>
        )}
      </View>

      <MonthYearPickerModal 
        visible={isPickerVisible}
        initialDate={currentDate}
        onClose={() => setIsPickerVisible(false)}
        onSelect={handleDateSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  
  // Dynamic counter section
  counterSection: {
    flex: 0,
  },
  
  counterSectionExpanded: {
    flex: 0.8, // Takes 80% of the screen when history is collapsed
    minHeight: 500,
  },
  
  counterSectionCompact: {
    flex: 0,
    minHeight: 280, // Smaller height when history is expanded
  },
  
  // Dynamic history section
  historySection: {
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  
  historySectionCollapsed: {
    flex: 0.2, // Takes only 20% when collapsed
    minHeight: 60, // Just enough for the header
  },
  
  historySectionExpanded: {
    flex: 1, // Take remaining space when expanded
  },
  
  // History header (always visible)
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  
  mainHistoryTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#FFFFFF',
  },
  
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  
  arrowButton: {
    padding: 8,
  },
  
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 3,
  },
  
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  activeTab: {
    backgroundColor: '#FF6D00',
  },
  
  tabText: {
    color: '#A0A0A0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  activeTabText: {
    color: '#FFFFFF',
  },
  
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#1E1E1E', 
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  historyItemContent: {
    flex: 1,
  },
  
  historyText: { 
    color: '#E0E0E0', 
    fontSize: 16,
    fontWeight: '600',
  },
  
  historyDate: { 
    color: '#A0A0A0', 
    fontSize: 13,
    marginTop: 4,
  },
  
  deleteButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
  
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  
  emptyText: { 
    color: '#A0A0A0', 
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
  },
});