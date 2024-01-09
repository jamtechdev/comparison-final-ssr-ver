import Image from "next/image";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
const IMAGE_ALT_TEXT = "Category Images";
export default function Category({ categories }) {
  const router = useRouter();
  return (
    <Row>
      {categories.map((section, index) => (
        <Col
          xl={3}
          lg={4}
          md={6}
          xs={6}
          key={index}
          onClick={() => {
            router.push(`/${section?.primary_archive_category}`);
          }}
        >
          <div className="category-section">
            <Image
              src={section.square_image}
              width={0}
              height={0}
              sizes="100%"
              alt={IMAGE_ALT_TEXT}
            />
            <span className="category_name">
              {section.primary_archive_category || "NOT FOUND"}
            </span>
          </div>
        </Col>
      ))}
    </Row>
  );
}
