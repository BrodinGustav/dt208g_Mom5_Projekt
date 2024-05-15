export interface Courses{
    courseCode: string;
    subjectCode: string;
    level: string;
    progression: string;
    courseName: string;
    points: number;
    institutionCode: string;
    subject: string;
    syllabus: string;
    [key: string]: any; //används för att bli av med "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Kurser'."  från diagrams ts-fil
}

