/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getBook(id) {
  const apiKey = "YOUR_API_KEY"; // Replace with your API key
  const apiEndpoint = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}&country=US`;
  const response = UrlFetchApp.fetch(apiEndpoint);
  return JSON.parse(response);
}

function bookLinkPreview(event) {
  if (event.docs.matchedUrl.url) {
    const segments = event.docs.matchedUrl.url.split("/");
    const volumeID = segments[segments.length - 1];

    const bookData = getBook(volumeID);
    const bookTitle = bookData.volumeInfo.title;
    const bookDescription = bookData.volumeInfo.description;
    const bookImage = bookData.volumeInfo.imageLinks.small;
    const bookAuthors = bookData.volumeInfo.authors;
    const bookPageCount = bookData.volumeInfo.pageCount;

    const previewHeader = CardService.newCardHeader()
      .setSubtitle(`By ${bookAuthors}`)
      .setTitle(bookTitle);

    const previewPages = CardService.newDecoratedText()
      .setTopLabel("Page count")
      .setText(bookPageCount);

    const previewDescription = CardService.newDecoratedText()
      .setTopLabel("About this book")
      .setText(bookDescription)
      .setWrapText(true);

    const previewImage = CardService.newImage()
      .setAltText("Image of book cover")
      .setImageUrl(bookImage);

    const buttonBook = CardService.newTextButton()
      .setText("View book")
      .setOpenLink(CardService.newOpenLink().setUrl(event.docs.matchedUrl.url));

    const cardSectionBook = CardService.newCardSection()
      .addWidget(previewImage)
      .addWidget(previewPages)
      .addWidget(CardService.newDivider())
      .addWidget(previewDescription)
      .addWidget(buttonBook);

    return CardService.newCardBuilder()
      .setHeader(previewHeader)
      .addSection(cardSectionBook)
      .build();
  }
}
