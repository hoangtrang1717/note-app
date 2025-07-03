import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import GradientView from '../components/GradientView';
import ScreenHeader from '../components/ScreenHeader';
import AboutUsIcon from '../components/Icons/AboutUsIcon';
import OnlineCustomerIcon from '../components/Icons/OnlineCustomerIcon';
import PrivacyPolicyIcon from '../components/Icons/PrivacyPolicyIcon';
import UserAgreementIcon from '../components/Icons/UserAgreementIcon';
import {clearAllNotes} from '../store/notesSlice';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDeleteAllNotes = useCallback(() => {
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            dispatch(clearAllNotes());
            Alert.alert('Success', 'All notes have been cleared');
          },
        },
      ],
    );
  }, [dispatch]);

  const handleMenuPress = useCallback((item: string) => {
    switch (item) {
      case 'onlineCustomer':
        console.log('Online Customer pressed');
        break;
      case 'userAgreement':
        console.log('User Agreement pressed');
        break;
      case 'privacyPolicy':
        console.log('Privacy Policy pressed');
        break;
      case 'aboutUs':
        console.log('About Us pressed');
        break;
      default:
        break;
    }
  }, []);

  const menuItems = [
    {
      id: 'onlineCustomer',
      title: 'Online Customer',
      hasChevron: true,
      icon: <OnlineCustomerIcon width={24} height={24} />,
    },
    {
      id: 'userAgreement',
      title: 'User Agreement',
      hasChevron: true,
      icon: <UserAgreementIcon width={24} height={24} />,
    },
    {
      id: 'privacyPolicy',
      title: 'Privacy Policy',
      hasChevron: true,
      icon: <PrivacyPolicyIcon width={24} height={24} />,
    },
    {
      id: 'aboutUs',
      title: 'About Us',
      hasChevron: true,
      icon: <AboutUsIcon width={24} height={24} />,
    },
  ];

  return (
    <GradientView
      customGradient={{
        colors: [...COLORS.GRADIENT_PRIMARY],
        locations: [0.14, 0.49, 0.75, 1.0],
        angle: 155.28,
      }}
      style={styles.container}>
      <ScreenHeader title="Settings" onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem]}
              onPress={() => handleMenuPress(item.id)}>
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              {item.hasChevron && (
                <FontAwesome6
                  name="chevron-right"
                  size={UI_CONSTANTS.ICON_SIZES.medium}
                  color={COLORS.ACCENT_PINK}
                  iconStyle="solid"
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAllNotes}>
            <Text style={styles.deleteButtonText}>Delete All Notes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.WHITE_08,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.WHITE_12,
    marginBottom: 16,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  menuItemText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
  },
  bottomContainer: {
    paddingVertical: UI_CONSTANTS.BOTTOM_CONTAINER_PADDING,
    backgroundColor: COLORS.HEADER_BG,
    alignItems: 'center',
    borderTopRightRadius: UI_CONSTANTS.BORDER_RADIUS.large,
    borderTopLeftRadius: UI_CONSTANTS.BORDER_RADIUS.large,
  },
  deleteButton: {
    backgroundColor: COLORS.ACCENT_PINK,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 34,
  },
  deleteButtonText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
  },
});
