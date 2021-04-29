export const eventsRules = {
  requiredtext() {
    return 'This field is required';
  },
  maxLenghtText(maxLength: number) {
    return `This field cannot exceed ${maxLength} characters`;
  },
  minLenghtText(minLength: number) {
    return `This field must include a minimum of ${minLength} characters.`;
  },
};
