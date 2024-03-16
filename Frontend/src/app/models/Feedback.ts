export interface Feedback {
    projectId: string;
    // feedbackType: number;
    feedbackType: string;
    dateReceived: Date;
    detailedFeedback: string;
    actionTaken: string;
    closureDate: Date;
}
  