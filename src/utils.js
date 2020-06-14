export const isDatingProfileCompleteForUser = (user) => {
    return (
        user.profilePhoto &&
        user.profilePhoto.length > 0 &&
        // user.school != "" &&
        // user.age &&
        // user.gender &&
        // user.genderPreference &&
        user.firstName
    );
}