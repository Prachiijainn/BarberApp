# Firebase Setup Guide for BarberBookingApp

## Prerequisites
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication and Firestore Database

## Step 1: Firebase Project Configuration

### 1.1 Create Firebase Project
1. Go to Firebase Console
2. Click "Create a project"
3. Enter project name: "barber-booking-app"
4. Enable Google Analytics (optional)
5. Create project

### 1.2 Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable Email/Password authentication
3. Enable Phone authentication (optional, for future use)

### 1.3 Enable Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select your preferred region

## Step 2: Android Configuration

### 2.1 Register Android App
1. In Firebase Console, click "Add app" > Android
2. Enter package name: `com.barberbookingapp`
3. Enter app nickname: "BarberBookingApp"
4. Enter SHA-1 certificate fingerprint (optional for now)
5. Download `google-services.json`

### 2.2 Add google-services.json
1. Place the downloaded `google-services.json` file in:
   ```
   android/app/google-services.json
   ```

### 2.3 Configure Android Build Files
1. Add to `android/build.gradle` (project level):
   ```gradle
   buildscript {
       dependencies {
           classpath 'com.google.gms:google-services:4.3.15'
       }
   }
   ```

2. Add to `android/app/build.gradle`:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

## Step 3: iOS Configuration

### 3.1 Register iOS App
1. In Firebase Console, click "Add app" > iOS
2. Enter bundle ID: `com.barberbookingapp`
3. Enter app nickname: "BarberBookingApp"
4. Download `GoogleService-Info.plist`

### 3.2 Add GoogleService-Info.plist
1. Open Xcode
2. Right-click on project name in navigator
3. Select "Add Files to [project name]"
4. Select the downloaded `GoogleService-Info.plist`
5. Ensure it's added to the target

## Step 4: React Native Firebase Configuration

The Firebase configuration is already set up in the code at:
- `src/services/firebase.js`

You'll need to replace the placeholder configuration with your actual Firebase project credentials.

## Step 5: Firestore Security Rules

Add these security rules to Firestore for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Barbers can read and write their own data
    match /barbers/{barberId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == barberId;
    }
    
    // Appointments can be read and written by the customer or barber involved
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.customerId || 
         request.auth.uid == resource.data.barberId);
    }
    
    // Reviews can be read by anyone, written by the customer who made the appointment
    match /reviews/{reviewId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.customerId;
    }
    
    // Services can be read by anyone, written by the barber who owns them
    match /services/{serviceId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == resource.data.barberId;
    }
  }
}
```

## Step 6: Test the Setup

1. Run the app: `npx react-native run-android` or `npx react-native run-ios`
2. Try registering a new user
3. Check Firebase Console to see if the user was created

## Troubleshooting

### Android Issues
- Make sure `google-services.json` is in the correct location
- Clean and rebuild: `cd android && ./gradlew clean && cd .. && npx react-native run-android`

### iOS Issues
- Make sure `GoogleService-Info.plist` is added to the Xcode project
- Clean and rebuild: `cd ios && xcodebuild clean && cd .. && npx react-native run-ios`

### General Issues
- Check that all Firebase services are enabled in Firebase Console
- Verify that your app package name matches the one in Firebase Console
- Check React Native Firebase documentation: https://rnfirebase.io/

## Next Steps

After Firebase is set up, you can:
1. Test user registration and authentication
2. Add Firestore data for barbers and services
3. Implement the full appointment booking flow
4. Add push notifications
5. Integrate payment gateway