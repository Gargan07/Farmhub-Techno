import { toast } from "react-toastify";

const CookieBanner = () => {
  const handleIframeLoad = () => {
    try {
      // Test if localStorage is available
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");

      toast.success("Storage access available!");
    } catch (error) {
      toast.error("Storage access denied!");
      console.error("Error accessing storage:", error);
    }
  };

  return (
    <div>
      <iframe
        title="Local Storage Test"
        srcDoc="<html><body><p>This is a local iframe.</p></body></html>"
        onLoad={handleIframeLoad}
        style={{ width: "100%", height: "100px", border: "1px solid black" }}
      ></iframe>
    </div>
  );
};

export default CookieBanner;
