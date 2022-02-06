import { useEffect } from "react";
import { useRouter } from "next/router";

// Hooks
import useAuthentication from "../../hooks/useAuthentication";

function AdminRoute({ component: Component, ...rest }) {
  const router = useRouter();
  const { isExpired } = useAuthentication();
  const { exp } = router.query;

  useEffect(() => {
    const expired = isExpired(exp);
    if (expired) {
      router.push("/admin");
    }
  }, []);

  return <Component props={{ ...rest }} />;
}

export default AdminRoute;
