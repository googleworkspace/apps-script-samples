function createSurveyForm() {
  const form = FormApp.create('KHẢO SÁT YẾU TỐ ẢNH HƯỞNG ĐẾN Ý ĐỊNH MUA NHÀ Ở');

  // Thông tin cá nhân
  form.addMultipleChoiceItem()
      .setTitle('Giới tính')
      .setChoiceValues(['Nam','Nữ','Khác'])
      .setRequired(false);
  form.addMultipleChoiceItem()
      .setTitle('Độ tuổi')
      .setChoiceValues(['Dưới 25','25–34','35–44','45 trở lên'])
      .setRequired(false);
  form.addTextItem()
      .setTitle('Nghề nghiệp chính (nếu khác, vui lòng ghi rõ)')
      .setRequired(false);
  form.addMultipleChoiceItem()
      .setTitle('Thu nhập hàng tháng (ước tính)')
      .setChoiceValues(['Dưới 10 triệu','10–20 triệu','20–30 triệu','Trên 30 triệu'])
      .setRequired(false);

  // Thang đo: 1–5
  const categories = {
    'Thái độ': [
      'Tôi tin rằng mua nhà là một quyết định khôn ngoan.',
      'Tôi hài lòng với việc sở hữu một căn nhà.',
      'Mua nhà mang lại cho tôi cảm giác tự hào.',
      'Tôi cảm thấy tích cực khi nghĩ đến việc mua nhà.',
      'Tôi cho rằng mua nhà là một ý tưởng hay.'
    ],
    'Chuẩn mực chủ quan': [
      'Gia đình tôi khuyến khích tôi mua nhà.',
      'Bạn bè tôi ủng hộ việc tôi mua nhà.',
      'Tôi nghĩ người thân sẽ tự hào nếu tôi sở hữu nhà.',
      'Gia đình tôi mong muốn tôi có một căn nhà.',
      'Tôi chịu ảnh hưởng bởi người quan trọng khi quyết định mua nhà.'
    ],
    'Kiểm soát hành vi': [
      'Tôi có khả năng tài chính để mua nhà.',
      'Tôi có thể kiểm soát quá trình mua nhà theo ý muốn.',
      'Tôi tự tin khi tìm kiếm và lựa chọn căn nhà.',
      'Tôi có đủ thông tin để ra quyết định mua nhà.',
      'Tôi có đủ kỹ năng và thời gian để quyết định mua nhà.'
    ],
    'Tài chính': [
      'Giá căn nhà phù hợp với thu nhập của tôi.',
      'Tôi có thể vay ngân hàng với mức lãi suất hợp lý.',
      'Tôi có khả năng trả góp căn nhà.',
      'Lãi suất và điều kiện vay ảnh hưởng đến quyết định.',
      'Tôi hiểu rõ các chi phí khi mua nhà.'
    ],
    'Vị trí': [
      'Căn nhà gần nơi làm việc hoặc trường học.',
      'Căn nhà gần trung tâm thương mại, siêu thị.',
      'Giao thông khu vực thuận tiện.',
      'Căn nhà nằm trong khu vực an toàn, yên tĩnh.',
      'Vị trí giúp tôi tiết kiệm thời gian di chuyển.'
    ]
  };

  // Thêm các câu trên thang số
  Object.values(categories).forEach(arr =>
    arr.forEach(q =>
      form.addScaleItem()
          .setTitle(q)
          .setBounds(1,5)
          .setRequired(true)
    )
  );

  // Câu mở ở cuối
  form.addParagraphTextItem()
      .setTitle('Bạn có chia sẻ thêm lý do hoặc trải nghiệm cá nhân khi mua (hoặc có ý định mua) nhà ở không?');

  Logger.log('Form URL: ' + form.getEditUrl());
}
