/**
 * تشغيل هذه الدالة لإنشاء نموذج Google Forms مع Google Sheet مرتبط
 * ثم سيتم طباعة روابط النموذج والجدول في سجل التنفيذ (Logger.log).
 */
function createForm() {
  // اسم النموذج
  var formTitle = "نموذج تسجيل البيانات";
  var form = FormApp.create(formTitle);
  
  // اسألنا عن الحقول اللي بعثتهم — إضافة العناصر:
  form.addTextItem().setTitle("الاسم الثلاثي").setRequired(true);
  form.addTextItem().setTitle("اسم الاب").setRequired(true);
  form.addTextItem().setTitle("اسم الأم").setRequired(true);
  form.addTextItem().setTitle("مكان وتاريخ الولادة").setRequired(true);
  form.addTextItem().setTitle("السكن السابق").setRequired(true);
  form.addTextItem().setTitle("السكن الحالي").setRequired(true);
  form.addTextItem().setTitle("العمل قبل الثورة").setRequired(false);
  form.addTextItem().setTitle("العمل بعد الثورة").setRequired(false);

  // الشهادة العلمية — خيارات
  var eduItem = form.addMultipleChoiceItem();
  eduItem.setTitle("الشهاده العلميه").setRequired(false);
  eduItem.setChoices([
    eduItem.createChoice("ابتدائي"),
    eduItem.createChoice("اعدادي"),
    eduItem.createChoice("تعليم اساسي"),
    eduItem.createChoice("ثانوي"),
    eduItem.createChoice("معهد متوسط"),
    eduItem.createChoice("اجازه"),
    eduItem.createChoice("اخرى")
  ]);

  form.addTextItem().setTitle("الحاله الاجتماعيه").setRequired(false);
  form.addTextItem().setTitle("عدد الزوجات").setRequired(false);
  form.addTextItem().setTitle("اسم الزوجة").setRequired(false);
  form.addTextItem().setTitle("عدد الولاد").setRequired(false);
  form.addTextItem().setTitle("رقم البطاقة الشخصية").setRequired(true);
  form.addTextItem().setTitle("زمرة الدم").setRequired(true);
  form.addTextItem().setTitle("رقم واتس أب").setRequired(true);
  form.addTextItem().setTitle("حساب شام كاش").setRequired(true);
  form.addTextItem().setTitle("نوع السلاح").setRequired(true);
  form.addTextItem().setTitle("رقم السلاح").setRequired(true);

  // إضافة فاصل أو وصف بسيط
  form.addSectionHeaderItem().setTitle("ملاحظة");
  form.addParagraphTextItem().setTitle("ملاحظات إضافية (اختياري)").setRequired(false);

  // ربط النموذج مع Google Sheets جديد
  var sheetName = formTitle + " - ردود";
  var ss = SpreadsheetApp.create(sheetName);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  // طباعة الروابط في السجل لتسهيل الوصول
  Logger.log("رابط النموذج: " + form.getPublishedUrl());
  Logger.log("رابط التعديل للنموذج (edit): " + form.getEditUrl());
  Logger.log("رابط Google Sheet المرتبط: " + ss.getUrl());
}
