export interface Feedback {
    projectId: string;
    feedbackType: number;
    dateReceived: Date;
    detailedFeedback: string;
    actionTaken: string;
    closureDate: Date;
}
  