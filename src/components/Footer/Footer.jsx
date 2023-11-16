import { Link } from "react-router-dom"
import { Logo } from "../index"
import { Container } from "../index"

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden border-t-2 border-t-black bg-[var(--dark)] py-4">
            <Container>
                <div>
                    <p className="text-center text-sm text-gray-300">
                        &copy; 2023. All Rights Reserved by Bloggie.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
