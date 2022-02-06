import Link from "next/link";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";

// Routes
import AdminRoute from "../components/routes/AdminRoute";

import api from "../api";

function AdminPanelContainer(props) {
  return (
    <>
      <AdminRoute component={AdminPanel} rest={props} />
    </>
  );
}

function AdminPanel() {
  const [loaded, setLoaded] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (!loaded) {
      async function loadAdmins() {
        const response = await api.getAdmins();
        const { admins } = response.data;
        console.log(admins);
        setAdmins(admins);
      }
      loadAdmins().then(() => {
        setLoaded(true);
      });
    }
  }, [setAdmins, loaded, setLoaded]);
  return (
    loaded && (
      <section>
        <div>
          Admin Panel Page
          <div>
            <Link href="/admin">Admin Page link</Link>
          </div>
          <ul>
            {admins.map((a) => {
              return <li key={a}>{a}</li>;
            })}
          </ul>
        </div>
      </section>
    )
  );
}

export default withRouter(AdminPanelContainer);
