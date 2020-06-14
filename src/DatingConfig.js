import { IMLocalized } from './Core/localization/IMLocalization';

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;
const regexForAge = /[0-9]/g;

const DatingConfig = {
    isSMSAuthEnabled: true,
    appIdentifier: 'Parrotv6',
    onboardingConfig: {
        welcomeTitle: IMLocalized('Find out who likes you back on campus'),
        welcomeCaption: IMLocalized('Made for schools & universities'),
        walkthroughScreens: [
            {
                icon: require("../assets/images/educate-school-icon.png"),
                title: "Welcome to Parrot",
                description: IMLocalized("The dating app designed specifically for universities & campuses– not random locals in your area.")
            },
            {
                icon: require("../assets/images/chirp-icon.png"),
                title: "Start Chirping!",
                description: IMLocalized("A chirp is an anonymous match request.\n A super chirp is the same thing but we let them know it's you. \n\n If two people chirp each other, it's a Pair!")
            },
            {
                icon: require("../assets/images/search.png"),
                title: "Swipe or Search",
                description: IMLocalized("Find users by swiping, searching their name or their associated student group (aka 'Flock').")
            },
            {
                icon: require("../assets/images/notification.png"),
                title: "Allow Notifications!",
                description: IMLocalized("Get notifications when someone likes you, and when you get new messages and matches.")
            }
        ]
    },
    editProfileFields: {
        sections: [
            {
                title: IMLocalized("PUBLIC PROFILE"),
                fields: [
                    {
                        displayName: IMLocalized("First Name"),
                        type: 'text',
                        editable: true,
                        regex: regexForNames,
                        key: 'firstName',
                        placeholder: 'Your first name'
                    },
                    {
                        displayName: IMLocalized("Last Name"),
                        type: 'text',
                        editable: true,
                        regex: regexForNames,
                        key: 'lastName',
                        placeholder: 'Your last name'
                    },

                    {
                        displayName: IMLocalized("Birthday"),
                        type: 'customText',
                        editable: true,
                        regex: regexForAge,
                        key: 'birthday',
                        placeholder: 'DD/MM/YY'
                    },
                    {
                        displayName: IMLocalized("Bio"),
                        type: 'text',
                        editable: true,
                        key: 'bio',
                        placeholder: 'Your bio'
                    },
                    {
                        displayName: IMLocalized("School"),
                        type: 'select',
                        options: ["Duke University", "UNC-Chapel Hill", "Brown Univeristy", "Yale University", "New York University", "LREI"],
                        displayOptions: ["Duke", "UNC-Chapel Hill", "Brown", "Yale", "NYU", "LREI", "NYU"],
                        editable: true,
                        key: 'school',
                        placeholder: 'Your School'
                    },
                    {
                        displayName: IMLocalized("Cohort"),
                        type: 'select',
                        options: ["Class of 2019", "Class of 2020", "Class of 2021", "Class of 2022", "Class of 2023", "Class of 2024", "Alum"],
                        displayOptions: ["Class of 2019", "Class of 2020", "Class of 2021", "Class of 2022", "Class of 2023", "Class of 2024", "Alum"],
                        editable: true,
                        key: 'cohort',
                        placeholder: 'Class of?'
                    },
                    {
                        displayName: IMLocalized("Instagram"),
                        type: 'text',
                        editable: true,
                        key: 'igHandle',
                        placeholder: '@username (optional)'
                    },
                    {
                        displayName: IMLocalized("Add/Remove Flocks"),
                        type: 'button',
                        // key: 'groups',
                        // placeholder: 'Your groups'
                    }
                ]
            },
            {
                title: IMLocalized("PRIVATE DETAILS"),
                fields: [
                    {
                        displayName: IMLocalized("E-mail Address"),
                        type: 'text',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    },
                    {
                        displayName: IMLocalized("Phone Number"),
                        type: 'text',
                        editable: true,
                        regex: regexForPhoneNumber,
                        key: 'phone',
                        placeholder: 'Your phone number'
                    }
                ]
            }
        ]
    },
    userSettingsFields: {
        sections: [
            {
                title: IMLocalized("DISCOVERY"),
                fields: [
                    {
                        displayName: IMLocalized("Show Me on Parrot"),
                        type: 'switch',
                        editable: true,
                        key: 'show_me',
                        value: true,
                    },
                    {
                        displayName: IMLocalized("Distance Radius"),
                        type: 'select',
                        options: ["5", "10", "15", "25", "50", "100", "unlimited"],
                        displayOptions: ["5 miles", "10 miles", "15 miles", "25 miles", "50 miles", "100 miles", "Unlimited"],
                        editable: true,
                        key: 'distance_radius',
                        value: "Unlimited",
                    },
                    {
                        displayName: IMLocalized("Gender"),
                        type: 'select',
                        options: ["female", "male", "none"],
                        displayOptions: ["Female", "Male", "None"],
                        editable: true,
                        key: 'gender',
                        value: "None",
                    },
                    {
                        displayName: IMLocalized("Gender Preference"),
                        type: 'select',
                        options: ["female", "male", "all"],
                        displayOptions: ["Female", "Male", "All"],
                        editable: true,
                        key: 'gender_preference',
                        value: "All",
                    }
                ]
            },
            {
                title: IMLocalized("PUSH NOTIFICATIONS"),
                fields: [
                    {
                        displayName: IMLocalized("New Pairs"),
                        type: 'switch',
                        editable: true,
                        key: 'push_new_matches_enabled',
                        value: true,
                    },
                    {
                        displayName: IMLocalized("New Messages"),
                        type: 'switch',
                        editable: true,
                        key: 'push_new_messages_enabled',
                        value: true
                    },
                    {
                        displayName: IMLocalized("Super Chirps"),
                        type: 'switch',
                        editable: true,
                        key: 'push_super_likes_enabled',
                        value: true
                    },
                    {
                        displayName: IMLocalized("All Chirps"),
                        type: 'switch',
                        editable: true,
                        key: 'push_top_picks_enabled',
                        value: true
                    }
                ]
            },
            {
                title: '',
                fields: [
                    {
                        displayName: IMLocalized("Save"),
                        type: 'button',
                        key: 'savebutton',
                    }
                ]
            }
        ]
    },
    contactUsFields: {
        sections: [
            {
                title: IMLocalized("CONTACT"),
                fields: [
                    {
                        displayName: IMLocalized("Contact"),
                        type: 'text',
                        editable: false,
                        key: 'push_notifications_enabled',
                        value: "Made by KYNG INC (Duke 2020)",
                    },
                    {
                        displayName: IMLocalized("E-mail"),
                        value: 'parrotexec@gmail.com',
                        type: 'text',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    },
                    {
                        displayName: IMLocalized("Privacy Policy"),
                        value: 'parrotexec@gmail.com',
                        type: 'button',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    },
                    {
                        displayName: IMLocalized("Terms & Conditions"),
                        value: 'parrotexec@gmail.com',
                        type: 'button',
                        editable: false,
                        key: 'email',
                        placeholder: 'Your email address'
                    }
                ]
            },

        ]
    },
    userGroupFields: {
        sections: [
            {
                title: IMLocalized("Select Flocks"),
                fields: [
                    {
                        displayName: IMLocalized("Alpha Phi"),
                        type: 'switch',
                        editable: true,
                        key: 'Alpha Phi',
                        value: false,
                    },
                    {
                        displayName: IMLocalized("Alpha Phi Alpha"),
                        type: 'switch',
                        editable: true,
                        key: 'Alpha Phi Alpha',
                        value: false
                    },
                    {
                        displayName: IMLocalized("Alpha Delta Phi"),
                        type: 'switch',
                        editable: true,
                        key: 'Alpha Delta Phi',
                        value: false
                    },
                    {
                        displayName: IMLocalized("Apple club"),
                        type: 'switch',
                        editable: true,
                        key: 'Apple club',
                        value: false
                    },
                    {
                        displayName: IMLocalized("African American club"),
                        type: 'switch',
                        editable: true,
                        key: 'African American club',
                        value: false
                    },

                ]
            },

        ]
    },
    contactUsPhoneNumber: "+16504859694"
};

export default DatingConfig;
