import { memo } from 'react';
import { BookInfo } from '../../typings/resType';
import { Card, Col } from 'react-bootstrap';

import './MainBookList.css';

type Props = {
  booksInfo: BookInfo[];
};

function MainBookList({ booksInfo }: Props) {
  return (
    <>
      {booksInfo !== undefined &&
        booksInfo?.map((book: BookInfo, index: number) => (
          <Col xs={6} md={4} lg={2} key={book.id}>
            <Card className="card border-light bg-transparent text-light">
              <Card.Img variant="top" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"} />
              <Card.Body>
                <Card.Title>{book.volumeInfo.title}</Card.Title>
                <Card.Subtitle>{book.volumeInfo.subtitle ? book.volumeInfo.subtitle : "No subtitle"}</Card.Subtitle>
                <Card.Text>{book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No author"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
    </>
  );
}

export default memo(MainBookList);
