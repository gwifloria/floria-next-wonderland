"use client";
import MapContainer from "@/components/MapContainer";
import { AuthProvider } from "@/context";

import withTheme from "@/theme";

const Travel = () => {
  return (
    <AuthProvider>
      <div className="travel-container justify-between h-dvh		">
        <MapContainer></MapContainer>
      </div>
    </AuthProvider>
  );
};
const BlogPage = () => {
  return withTheme(<Travel />);
};
export default BlogPage;
