# Toast Component System

A modern, animated toast notification system for React Native built with Reanimated 3. Features glassmorphism design, haptic feedback, and smooth animations that perfectly complement your app's design system.

## Features

- 🎨 **Modern Design**: Glassmorphism effects with your app's color system
- 🔄 **Smooth Animations**: Built with React Native Reanimated 3
- 📱 **Gesture Support**: Swipe left/right to dismiss
- 🎯 **Haptic Feedback**: iOS haptic feedback integration
- 🌈 **Multiple Types**: Success, Error, Warning, Info variants
- ⏱️ **Auto Dismiss**: Configurable duration or persistent toasts
- 📚 **Type Safe**: Full TypeScript support
- 🎭 **Theme Aware**: Supports light/dark themes
- 📱 **Responsive**: Works with safe area and multiple screen sizes

## Installation

The toast system is already included in your project. Make sure you have the required dependencies:

- `react-native-reanimated` (already installed)
- `react-native-gesture-handler` (already installed)
- `react-native-safe-area-context` (already installed)
- `expo-haptics` (already installed)

## Setup

### 1. Wrap your app with ToastProvider

```tsx
import { ToastProvider } from '@/components/ui/toast';

export default function App() {
  return (
    <ToastProvider maxToasts={3}>
      {/* Your app content */}
      <YourAppContent />
    </ToastProvider>
  );
}
```

### 2. Use the toast hook in your components

```tsx
import { useToast } from '@/components/ui/toast';

export function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = () => {
    showSuccess('Success!', 'Your action was completed successfully.');
  };

  return (
    <Button onPress={handleAction}>
      Trigger Toast
    </Button>
  );
}
```

## API Reference

### ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Your app content |
| `maxToasts` | `number` | `3` | Maximum number of toasts to show simultaneously |

### useToast Hook

The `useToast` hook returns an object with the following methods:

#### showToast(toast)
Generic method to show any toast type.

```tsx
const { showToast } = useToast();

showToast({
  type: 'success',
  title: 'Success!',
  message: 'Optional message',
  duration: 4000
});
```

#### showSuccess(title, message?, duration?)
Show a success toast with green accent and checkmark icon.

```tsx
const { showSuccess } = useToast();

showSuccess('Success!', 'Your action was completed successfully.', 4000);
```

#### showError(title, message?, duration?)
Show an error toast with red accent and X circle icon.

```tsx
const { showError } = useToast();

showError('Error occurred', 'Something went wrong. Please try again.', 5000);
```

#### showWarning(title, message?, duration?)
Show a warning toast with orange accent and alert circle icon.

```tsx
const { showWarning } = useToast();

showWarning('Warning', 'Please check your internet connection.', 4000);
```

#### showInfo(title, message?, duration?)
Show an info toast with blue accent and info icon.

```tsx
const { showInfo } = useToast();

showInfo('Info', 'Here\'s some useful information for you.', 3000);
```

#### dismissToast(id)
Dismiss a specific toast by ID.

```tsx
const { dismissToast } = useToast();

dismissToast('toast-id');
```

#### dismissAll()
Dismiss all currently visible toasts.

```tsx
const { dismissAll } = useToast();

dismissAll();
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `title` | `string` | ✅ | - | Main toast title |
| `message` | `string` | ❌ | - | Optional secondary message |
| `duration` | `number` | ❌ | `4000` | Auto-dismiss duration in ms. Use `0` for persistent toasts |

## Usage Examples

### Basic Usage

```tsx
import { useToast } from '@/components/ui/toast';

function LoginForm() {
  const { showSuccess, showError } = useToast();

  const handleLogin = async () => {
    try {
      await login();
      showSuccess('Welcome back!', 'You have successfully logged in.');
    } catch (error) {
      showError('Login failed', 'Please check your credentials and try again.');
    }
  };

  return <Button onPress={handleLogin}>Login</Button>;
}
```

### Multiple Toasts

```tsx
function MultipleToastsExample() {
  const { showSuccess, showInfo, showWarning } = useToast();

  const handleShowMultiple = () => {
    showInfo('Step 1', 'Starting process...');
    
    setTimeout(() => {
      showWarning('Step 2', 'Processing data...');
    }, 1000);
    
    setTimeout(() => {
      showSuccess('Complete', 'Process finished successfully!');
    }, 2000);
  };

  return <Button onPress={handleShowMultiple}>Start Process</Button>;
}
```

### Persistent Toast

```tsx
function PersistentToastExample() {
  const { showWarning, dismissAll } = useToast();

  const showPersistent = () => {
    showWarning(
      'No internet connection',
      'Please check your connection and try again.',
      0 // Never auto-dismiss
    );
  };

  return (
    <View>
      <Button onPress={showPersistent}>Show Persistent Toast</Button>
      <Button onPress={dismissAll}>Dismiss All</Button>
    </View>
  );
}
```

### Custom Duration

```tsx
function CustomDurationExample() {
  const { showInfo } = useToast();

  return (
    <View>
      <Button onPress={() => showInfo('Quick', 'This disappears quickly', 1000)}>
        1 Second Toast
      </Button>
      <Button onPress={() => showInfo('Long', 'This stays longer', 10000)}>
        10 Second Toast
      </Button>
    </View>
  );
}
```

## Toast Types & Styling

### Success Toast
- **Color**: Green (`#34C759` / `#30D158`)
- **Icon**: CheckCircle2
- **Use case**: Successful operations, confirmations

### Error Toast
- **Color**: Red (`#FF3B30` / `#FF453A`)
- **Icon**: XCircle
- **Use case**: Errors, failures, critical issues

### Warning Toast
- **Color**: Orange (`#FF9500` / `#FF9F0A`)
- **Icon**: AlertCircle
- **Use case**: Warnings, cautions, important notices

### Info Toast
- **Color**: Blue (`#007AFF` / `#0A84FF`)
- **Icon**: Info
- **Use case**: Information, tips, neutral updates

## Gestures & Interactions

### Swipe to Dismiss
- Swipe left or right to dismiss any toast
- Minimum swipe distance: 30% of screen width
- Smooth spring animation when gesture is cancelled

### Tap to Dismiss
- Tap the X button in the top-right corner
- Includes haptic feedback on iOS

### Auto Dismiss
- Default duration: 4000ms (4 seconds)
- Set `duration: 0` for persistent toasts
- Timer pauses during gestures

## Styling & Theming

The toast system automatically adapts to your app's theme:

- **Light Mode**: Light backgrounds with dark text
- **Dark Mode**: Dark backgrounds with light text
- **Colors**: Uses your app's color system from `@/theme/colors`
- **Typography**: Uses Plus Jakarta Sans font family
- **Animations**: Smooth spring animations with proper easing

### Design Features

- **Glassmorphism**: Subtle blur and transparency effects
- **Rounded Corners**: Consistent with your app's design (14px radius)
- **Shadow**: Subtle drop shadow for depth
- **Accent Bar**: Colored left border indicating toast type
- **Icon Background**: Tinted background matching toast type
- **Safe Area**: Respects device safe areas

## Best Practices

### When to Use Toasts

✅ **Good use cases:**
- Success confirmations
- Error messages
- Quick status updates
- Non-critical information

❌ **Avoid toasts for:**
- Critical alerts (use modals instead)
- Complex information
- Actions requiring user input
- Permanent status indicators

### Toast Content Guidelines

- **Keep titles short**: 1-3 words maximum
- **Be specific**: "Login successful" vs "Success"
- **Provide context**: Include helpful next steps
- **Use appropriate tone**: Match the toast type

### Performance Tips

- Limit simultaneous toasts (max 3 recommended)
- Use appropriate durations (3-5 seconds for most cases)
- Dismiss old toasts when showing new ones
- Avoid showing toasts too frequently

## Accessibility

The toast system includes accessibility features:

- **Screen Reader Support**: Proper content descriptions
- **Focus Management**: Doesn't interfere with focus flow
- **Color Contrast**: Meets WCAG guidelines
- **Gesture Alternatives**: Multiple dismiss methods
- **Reduced Motion**: Respects system accessibility settings

## Troubleshooting

### Common Issues

**Toasts not appearing:**
- Ensure `ToastProvider` wraps your app
- Check that you're using `useToast` inside the provider
- Verify React Native Reanimated is properly installed

**Animation issues:**
- Make sure React Native Reanimated 3 is configured
- Check that gesture handler is properly set up
- Ensure safe area context is available

**Styling problems:**
- Verify theme colors are properly defined
- Check that custom fonts are loaded
- Ensure proper import paths

### Performance

The toast system is optimized for performance:
- Uses native animations via React Native Reanimated
- Minimal re-renders with proper state management
- Efficient gesture handling
- Proper cleanup of timers and animations

## Demo

To see the toast system in action, you can use the included demo component:

```tsx
import { ToastDemo } from '@/components/ui/toast/toast-demo';

// In your development/testing screen
<ToastDemo />
```

This demo showcases all toast types, durations, and features.