import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  FileDown, 
  Eye, 
  User, 
  Calendar, 
  GraduationCap,
  Book,
  Clock,
  UserCog,
  ClipboardList,
  ScrollText
} from "lucide-react";
import { generateDoc } from '@/lib/doc-generator';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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

export function LearningPlanForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    date: '',
    examDate: '',
    subject: '',
    timePeriod: '',
    teacherName: '',
  });

  const handleExport = async () => {
    await generateDoc({
      studentName: formData.studentName,
      date: new Date().toLocaleDateString('he-IL'),
      examDate: formData.examDate,
      subject: formData.subject,
      timePeriod: formData.timePeriod,
      teacherName: formData.teacherName,
    });
  };

  const formFields = [
    {
      label: "שם התלמיד",
      icon: User,
      value: formData.studentName,
      type: "input",
      onChange: (value: string) => setFormData({ ...formData, studentName: value })
    },
    {
      label: "מועד בגרות",
      icon: Calendar,
      value: formData.examDate,
      type: "select",
      options: examDates,
      onChange: (value: string) => setFormData({ ...formData, examDate: value })
    },
    {
      label: "מקצוע",
      icon: Book,
      value: formData.subject,
      type: "select",
      options: subjects,
      onChange: (value: string) => setFormData({ ...formData, subject: value })
    },
    {
      label: "פרק הזמן",
      icon: Clock,
      value: formData.timePeriod,
      type: "select",
      options: timePeriods,
      onChange: (value: string) => setFormData({ ...formData, timePeriod: value })
    },
    {
      label: "שם המורה",
      icon: UserCog,
      value: formData.teacherName,
      type: "input",
      onChange: (value: string) => setFormData({ ...formData, teacherName: value })
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 md:px-8"
    >
      <Card className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto bg-white/50 backdrop-blur-sm shadow-lg">
        <motion.div 
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-8 flex-col sm:flex-row gap-4 sm:gap-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-right">
              תל"א - תכנית לימודים אישית
            </h2>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {formFields.map((field, index) => (
              <motion.div
                key={field.label}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Label className="text-right flex items-center gap-2">
                  <field.icon className="h-4 w-4" />
                  {field.label}
                </Label>
                {field.type === "input" ? (
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="select-trigger">
                        <SelectValue placeholder={`בחר/י ${field.label}`} />
                      </SelectTrigger>
                      <SelectContent align="end" side="bottom" className="select-content">
                        {field.options?.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="select-item"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex justify-end gap-2 sm:gap-4 mt-6 sm:mt-8 flex-col sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full sm:w-auto hover:bg-primary/5">
                    <Eye className="ml-2 h-4 w-4" />
                    תצוגה מקדימה
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogTitle className="sr-only">
                  תצוגה מקדימה של תל"א
                </DialogTitle>
                <DialogDescription className="sr-only">
                  תצוגה מקדימה של תכנית הלימודים האישית
                </DialogDescription>
                
                <motion.div 
                  className="p-4 sm:p-8 bg-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-center mb-4">
                    <img 
                      src="/images/amal-logo.png" 
                      alt="Amal Logo" 
                      className="h-12 sm:h-16 w-auto"
                    />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                    תל"א - תכנית לימודים אישית
                  </h1>
                  
                  <div className="space-y-3 sm:space-y-4 text-right">
                    <div className="space-y-2">
                      {formFields.map((field, index) => (
                        <motion.p 
                          key={field.label}
                          className="text-base sm:text-lg flex items-center justify-end gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {field.type === "select" 
                            ? field.options?.find(opt => opt.value === field.value)?.label 
                            : field.value}
                          <span className="font-bold">:{field.label}</span>
                          <field.icon className="h-4 w-4" />
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  <motion.p 
                    className="text-xs sm:text-sm text-gray-500 text-center mt-6 sm:mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    מסמך זה הופק באופן אוטומטי
                  </motion.p>
                </motion.div>
              </DialogContent>
            </Dialog>

            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleExport} 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                <FileDown className="ml-2 h-4 w-4" />
                ייצוא למסמך Word
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
}