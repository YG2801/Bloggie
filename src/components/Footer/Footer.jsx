import { Container } from '../index';

export default function Footer() {
  return (
    <footer className="relative w-full bg-white py-6 shadow-md">
      <Container>
        <div>
          <p className="text-center text-sm text-gray-500">
            &copy; 2023. All rights reserved by Bloggie.
          </p>
        </div>
      </Container>
    </footer>
  );
}
