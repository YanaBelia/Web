import classNames from "classnames";
import styles from "./styles.module.scss";

import Logo from "../../../public/favicon.svg";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import paths from "../../core/paths";
import Link from "../common/icon-link";
import { AccountContext } from "../../pages";

interface Props {
  open: boolean;
}

const Navbar: React.FC<Props> = ({ open }) => {
  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const size = 70;

  useEffect(() => {
    fetch(`https://random.imagecdn.app/${size}/${size}`).then((res) =>
      setUserPhotoUrl(res.url)
    );
  }, []);

  const { fullname, location, online, messages } = useContext(AccountContext);

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.open]: open,
      })}
    >
      <div className={styles.head}>
        <Logo />
        <h1>Smart</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.profile}>
          {userPhotoUrl && (
            <div
              className={classNames(styles["photo-container"], {
                [styles.online]: online,
              })}
            >
              <Image
                className={styles.photo}
                src={userPhotoUrl}
                width={size}
                height={size}
                alt=""
              />
            </div>
          )}
          <div className={styles["profile-info"]}>
            <span className={styles["fullname"]}>{fullname}</span>
            <span className={styles["location"]}>{location}</span>
          </div>
        </div>
        <div className={styles.links}>
          {paths.withIcons.map((path) => (
            <div className={styles.link} key={path.path}>
              <Link icon={path.icon} to={path.path}>
                {path.name}
              </Link>
              {path.path === "/messages" && !!messages && (
                <span className={styles["messages-count"]}>{messages}</span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.separator} />
        <div className={styles.links}>
          {paths.withoutIcons.map((path) => (
            <Link key={path.path} to={path.path}>
              {path.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
