import { Link, NavLink } from "react-router-dom";
import style from "../layouts/GNB.module.css";
import GNBlogo from "../assets/images/img_gnb_logo.png";

const NAV_MENU = [
  { id: 1, label: "나의 기업 비교", path: "/mycompare" },
  { id: 2, label: "비교 현황", path: "/comparestat" },
  { id: 3, label: "투자 현황", path: "/investstat" },
];

function GNB() {
  return (
    <nav className={style.container}>
      <div className={style.gnbBox}>
        <div className={style.logoWrapper}>
          <Link to="/">
            <img src={GNBlogo} alt="뷰 마이 스타트업 홈" />
          </Link>
        </div>

        <div className={style.navMenu}>
          {NAV_MENU.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.path}
              className={({ isActive }) =>
                `${style.navLink} ${isActive ? style.active : ""}`
              }
            >
              <span className={style.nameTag}>{menu.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default GNB;
