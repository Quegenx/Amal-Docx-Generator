import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle, Packer, IPropertiesOptions, ImageRun } from 'docx';
import { saveAs } from 'file-saver';

interface FormData {
  studentName: string;
  date: string;
  examDate: string;
  subject: string;
  timePeriod: string;
  teacherName: string;
}

export const generateDoc = async (data: FormData) => {
  const documentProperties: IPropertiesOptions = {
    rightToLeft: true,
  };

  const doc = new Document({
    properties: documentProperties,
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1000,
            right: 1500,
            bottom: 1000,
            left: 1500,
          },
        },
      },
      children: [
        // Logo - centered (removed separator after logo)
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [
            new ImageRun({
              data: await fetch('/images/amal-logo.png').then(r => r.arrayBuffer()),
              transformation: {
                width: 120,
                height: 120,
              },
            }),
          ],
        }),

        // Title - centered with one full-width decorative line
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━", color: "666666" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          bidirectional: false,
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({
              text: "תל\"א - תכנית לימודים אישית",
              size: 36,
              bold: true,
              color: "000000",
              rightToLeft: false,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 400 },
          children: [
            new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━━━", color: "666666" }),
          ],
        }),

        // Date field
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({
              text: new Date().toLocaleDateString('he-IL'),
              size: 24,
              color: "666666",
            }),
          ],
        }),

        // Single border before fields
        new Paragraph({
          spacing: { before: 200, after: 200 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          },
          children: [],
        }),

        // Fields with improved spacing and styling
        ...createField("שם התלמיד", data.studentName),
        ...createField("מועד בגרות", getExamDateLabel(data.examDate)),
        ...createField("מקצוע", getSubjectLabel(data.subject)),
        ...createField("פרק הזמן", getTimePeriodLabel(data.timePeriod)),
        ...createField("שם המורה", data.teacherName),

        // Bottom border
        new Paragraph({
          spacing: { before: 200, after: 400 },
          border: {
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          },
          children: [],
        }),

        // Footer with styling
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          bidirectional: false,
          children: [
            new TextRun({
              text: "מסמך זה הופק באופן אוטומטי",
              size: 20,
              color: "666666",
              rightToLeft: false,
            }),
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `תכנית-לימודים-${data.studentName}-${new Date().toLocaleDateString('he-IL')}.docx`;
  saveAs(blob, fileName);
};

// Helper function with improved styling
const createField = (label: string, value: string): Paragraph[] => {
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 200, after: 100 },
      bidirectional: false,
      indent: { right: 360 },
      children: [
        new TextRun({
          text: value,  // Value first
          size: 24,
          rightToLeft: false,
          color: "333333",
        }),
        new TextRun({
          text: "  ",  // Space for separation
          size: 24,
        }),
        new TextRun({
          text: ":",  // Colon
          size: 24,
          bold: true,
          rightToLeft: false,
        }),
        new TextRun({
          text: label,  // Label last
          size: 24,
          bold: true,
          rightToLeft: false,
        }),
      ],
    }),
  ];
};

// Helper functions
const getExamDateLabel = (value: string) => {
  return examDates.find(date => date.value === value)?.label || value;
};

const getSubjectLabel = (value: string) => {
  return subjects.find(subject => subject.value === value)?.label || value;
};

const getTimePeriodLabel = (value: string) => {
  return timePeriods.find(period => period.value === value)?.label || value;
};

// Constants
const examDates = [
  { value: "winter2024", label: "בגרות חורף 2024" },
  { value: "summer2024", label: "בגרות קיץ 2024" },
  { value: "winter2025", label: "בגרות חורף 2025" },
];

const subjects = [
  { value: "math", label: "מתמטיקה" },
  { value: "english", label: "אנגלית" },
  { value: "communication", label: "תקשורת" },
  { value: "art", label: "אומנות" },
  { value: "autocad", label: "אוטוקד" },
  { value: "civics", label: "אזרחות" },
];

const timePeriods = [
  { value: "jan2025", label: "ינואר 2025" },
  { value: "feb2025", label: "פברואר 2025" },
  { value: "jun2025", label: "יוני 2025" },
  { value: "jul2025", label: "יולי 2025" },
  { value: "aug2025", label: "אוגוסט 2025" },
];