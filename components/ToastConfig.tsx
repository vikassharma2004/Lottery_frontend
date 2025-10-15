import { View, Text } from 'react-native';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';

// Custom config
export const toastConfig: ToastConfig = {
  // Success toast
  success: (props) => (
    <View
      style={{
        height: 80,
        width: '90%',
        backgroundColor: '#4caf50',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
        {props.text1}
      </Text>
      <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
        {props.text2}
      </Text>
    </View>
  ),

  // Error toast
  error: (props) => (
    <View
      style={{
        height: 80,
        width: '90%',
        backgroundColor: '#f44336',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
        {props.text1}
      </Text>
      <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
        {props.text2}
      </Text>
    </View>
  ),

  // Info toast
  info: (props) => (
    <View
      style={{
        height: 80,
        width: '90%',
        backgroundColor: '#2196f3',
        borderRadius: 12,
        padding: 16,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
        {props.text1}
      </Text>
      <Text style={{ fontSize: 14, color: '#fff', marginTop: 4 }}>
        {props.text2}
      </Text>
    </View>
  ),
};
