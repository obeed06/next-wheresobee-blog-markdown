export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t">
      <div className="container mx-auto px-6 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wanderlust Tales. All rights reserved.</p>
        <p className="text-sm mt-1">Exploring the world, one story at a time.</p>
      </div>
    </footer>
  );
}
