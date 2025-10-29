import { View, Text } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  // ✅ Success Toast
  success: (props) => (
    <View
      style={{
        width: '92%',
        backgroundColor: '#E8F5E9', // soft green background
        borderLeftWidth: 4,
        borderLeftColor: '#43A047', // success green accent
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignSelf: 'center',
        marginVertical: 6,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#2E7D32' }}>
        {props.text1}
      </Text>
      {props.text2 ? (
        <Text style={{ fontSize: 13, color: '#33691E', marginTop: 3 }}>
          {props.text2}
        </Text>
      ) : null}
    </View>
  ),

  // ❌ Error Toast
  error: (props) => (
    <View
      style={{
        width: '92%',
        backgroundColor: '#FDECEA', // soft red background
        borderLeftWidth: 4,
        borderLeftColor: '#E53935', // red accent
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignSelf: 'center',
        marginVertical: 6,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#C62828' }}>
        {props.text1}
      </Text>
      {props.text2 ? (
        <Text style={{ fontSize: 13, color: '#B71C1C', marginTop: 3 }}>
          {props.text2}
        </Text>
      ) : null}
    </View>
  ),

  // ℹ️ Info Toast
  info: (props) => (
    <View
      style={{
        width: '92%',
        backgroundColor: '#E3F2FD', // soft blue background
        borderLeftWidth: 4,
        borderLeftColor: '#1E88E5', // blue accent
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignSelf: 'center',
        marginVertical: 6,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1565C0' }}>
        {props.text1}
      </Text>
      {props.text2 ? (
        <Text style={{ fontSize: 13, color: '#0D47A1', marginTop: 3 }}>
          {props.text2}
        </Text>
      ) : null}
    </View>
  ),
};
