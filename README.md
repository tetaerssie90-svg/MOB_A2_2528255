# TetaPortfolio

**Personal Portfolio Mobile Application**

| Information | Details |
| --- | --- |
| Student | Teta Erssie |
| Registration Number | 2528255 |
| Verification Code | MOB-A2-8255 |
| Application Name | TetaPortfolio |
| Android Package | `rw.ac.ines.ug2528255.tetaportfolio` |
| Course | SWE 3409 — Mobile Application Development |
| Assignment | Individual Assignment 2 |

## 1. Project Overview

TetaPortfolio is a personal portfolio mobile application that I developed using React Native and Expo.

The purpose of this application is to present my personal information, technical skills, education, and projects in a simple and interactive way.

Instead of using a traditional paper CV, the application allows recruiters or other interested people to learn about me and my experience directly from an Android device.

The application is designed to work offline, making the portfolio accessible without requiring an internet connection.

I also implemented a profile editing feature that allows me to update certain personal details directly from the application.

## 2. Application Features

### Home Screen

The home screen introduces me and displays important information about my profile.

It includes:

- My name and profile picture.
- A short professional headline.
- My personal biography.
- My availability status.
- My student verification code.

If no profile picture is selected, the application displays a default avatar.

### Skills and Education

This section presents my technical skills and educational background.

I included seven skills with short explanations to demonstrate my knowledge and experience.

The education section shows my academic background and training history.

I used reusable components such as `SkillCard` and `TimelineItem` to organize the information.

### Projects

The Projects section displays some of the projects I have worked on.

Each project has its own details screen containing:

- The problem the project addresses.
- My contribution to the project.
- Technologies used.
- The project's outcome.

This helps users understand my practical experience.

### Profile Editing

I implemented a profile editing feature that allows me to update:

- Professional headline.
- Biography.
- Primary skill.
- Availability status.
- Profile picture.

I also added form validation to prevent users from saving incorrect information.

The validation rules include:

| Field | Validation |
| --- | --- |
| Headline | Required, between 10 and 80 characters |
| Biography | Required, between 40 and 300 characters; links and email addresses are not allowed |
| Primary Skill | Required, between 2 and 40 characters; supports letters, numbers, and selected special characters |
| Availability | An availability status must be selected |

The application prevents saving when the information does not meet these requirements.

### Profile Picture

The application allows users to:

- Select a picture from their phone gallery.
- Take a new picture using the camera.
- Preview the selected picture.
- Replace an existing picture.
- Remove the current picture.

I also handled situations where the user denies permission or cancels the image selection.

### Local Data Storage

I used AsyncStorage to save profile information locally on the device.

This allows the application to remember changes even after it is closed and reopened.

I also implemented a **Reset Saved Profile** option to restore the default profile information.

### Offline Functionality

The application works without an internet connection because the portfolio information is included in the application.

An internet connection is only required when opening external links such as GitHub and LinkedIn.

### About Screen

The About screen displays:

- Application name.
- Student name.
- Registration number.
- Verification code.
- Application version.
- Information about local data storage.

## 3. Technologies Used

I developed this application using the following technologies:

| Technology | Purpose |
| --- | --- |
| React Native | Building the mobile application |
| Expo | Mobile application development and building |
| TypeScript | Writing type-safe application code |
| Expo Router | Navigation between application screens |
| NativeWind | Styling the user interface |
| AsyncStorage | Saving profile information locally |
| Expo Image Picker | Selecting images and accessing the camera |
| Expo File System | Managing local image files |
| EAS Build | Generating the Android APK |

## 4. Project Structure

I organized the project into different folders to make the code easier to understand and maintain.

```text
src/
  app/
    _layout.tsx
    +not-found.tsx

    (tabs)/
      _layout.tsx
      index.tsx
      skills.tsx
      profile.tsx
      about.tsx

      projects/
        _layout.tsx
        index.tsx
        [id].tsx

  components/
    ui/
    profile/
    skills/
    projects/
    BottomTabDock.tsx
    ErrorBoundary.tsx

  constants/
    student.ts
    app.ts

  context/
    ProfileContext.tsx

  data/
    portfolio.ts

  design-system/

  hooks/
    useProfileImagePicker.ts

  types/

  utils/
```

### Important Files

- `src/constants/student.ts` — Contains my personal and student information.
- `src/data/portfolio.ts` — Contains my skills, education, projects, and default profile information.
- `src/context/ProfileContext.tsx` — Manages profile information and local storage.
- `src/components/` — Contains reusable interface components.
- `src/utils/` — Contains helper functions for validation and storage.
- `src/app/` — Contains application screens and navigation.

This structure helped me separate different parts of the application and reuse components where necessary.

## 5. Installation and Setup

### Requirements

Before running the project, make sure you have:

- Node.js version 20 or later.
- npm.
- An Android emulator or physical Android device.
- Expo Go for development testing.

### Installation

Clone the repository and open the project folder.

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

You can then run the application using an Android emulator or Expo Go on your phone.

### TypeScript Validation

To check the project for TypeScript errors, run:

```bash
npm run typecheck
```

## 6. Building the Android APK

I used Expo Application Services (EAS) to generate an installable Android application.

Install the EAS command-line tool:

```bash
npm install -g eas-cli
```

Log in to your Expo account:

```bash
eas login
```

Build the Android application:

```bash
eas build -p android --profile preview
```

The `preview` profile in `eas.json` is configured to generate an APK.

The generated APK can be installed and launched on an Android device without Expo Go.

**APK filename:** `MOB_A2_2528255.apk`

## 7. Testing and Verification

During development, I tested the application to check whether its main features worked correctly.

The areas tested included:

- Navigation between screens.
- Displaying personal portfolio information.
- Opening project details.
- Editing profile information.
- Form validation.
- Selecting and removing profile pictures.
- Saving profile information locally.
- Restoring saved information after restarting the application.
- Resetting the saved profile.
- Offline functionality.

I also ran the TypeScript validation command:

```bash
npm run typecheck
```

The application was built as an installable Android APK.

Additional testing information is documented in:

`evidence/MOB_A2_2528255_TEST_LOG.pdf`

## 8. Application Release Information

| Item | Details |
| --- | --- |
| Application Version | 1.0.0 |
| Android Package | `rw.ac.ines.ug2528255.tetaportfolio` |
| Repository Name | `MOB_A2_2528255` |
| GitHub Account | `tetaerssie90-svg` |
| Release Tag | `v1.0.0` |
| APK Filename | `MOB_A2_2528255.apk` |
| Demo Video | `MOB_A2_2528255_DEMO.mp4` |
| Tested Device | To be added after physical-device testing |
| Android Version | To be added after physical-device testing |
| Final Commit Hash | To be added after the final commit |
| Release Link | To be added after publishing the release |

**Note:** The remaining release information will be updated after the project has been pushed to GitHub and the final release has been published.

## 9. Known Limitations

Although the application supports its main features, there are some limitations:

- Skills, education, and project information cannot be edited directly from the application. These details are currently managed in the source code.
- Profile information is stored locally and is not synchronized across devices.
- Uninstalling the application removes the locally saved profile information.
- The application currently supports only a light theme.
- External links require an internet connection.

## 10. AI Assistance and Development Process

I developed most of this application independently, including the application screens, navigation, user interface, profile editing, local storage, and testing.

During development, I occasionally used **ChatGPT** to help me understand certain concepts, troubleshoot errors, and get suggestions when I encountered difficulties.

Some of the areas where I sought assistance included:

- Understanding React Native and Expo Router concepts.
- Getting suggestions for organizing components.
- Understanding form validation and local data storage.
- Troubleshooting development errors.
- Improving the application's user interface.
- Organizing project documentation.

I used ChatGPT mainly as a learning and problem-solving tool.

I was responsible for implementing the application, making development decisions, reviewing the code, and testing the final result.

For more information about AI assistance, refer to:

`evidence/AI_USE.md`

## 11. Conclusion

Developing TetaPortfolio helped me improve my understanding of mobile application development using React Native, Expo, and TypeScript.

Through this assignment, I gained practical experience in creating mobile interfaces, implementing navigation, handling user input, validating forms, storing information locally, and building Android applications.

The final result is an offline personal portfolio application that presents my skills, education, and projects in an organized and accessible way.

---

**Developed by:** Teta Erssie  
**Registration Number:** 2528255  
**Course:** SWE 3409 — Mobile Application Development  
**Assignment:** Individual Assignment 2