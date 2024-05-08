import { useState } from "react";
import { isabelsTopNav } from "./menuData";
import "./Menu.css";
import Anchor from "../components/LoadingGrid/Anchor/Anchor";

function MenuItemHeader({ navItem, isFolder, isOpen, handleOpen }) {
  const isLink = !!navItem.link;
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: isFolder ? "center" : "flex-start",
      }}
    >
      {isFolder ? (
        <button onClick={handleOpen}>
          <div className={isOpen ? "menu-arrow open" : "menu-arrow"} />
        </button>
      ) : (
        "-"
      )}
      {isLink ? (
        <Anchor
          key={`${navItem.id}`}
          href={navItem.link}
          ariaLabel={navItem.value}
        >
          {navItem.value}
        </Anchor>
      ) : (
        <div key={`${navItem.id}`}>{navItem.value}</div>
      )}
    </div>
  );
}

function MenuItem(props) {
  const { navItem, defaultIsOpen } = props;
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  function handleOpen() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  if (navItem.children?.length) {
    return (
      <div>
        <MenuItemHeader
          isFolder
          navItem={navItem}
          isOpen={isOpen}
          handleOpen={handleOpen}
        />
        {isOpen && (
          <div className={navItem.isEnd ? "last-children" : ""}>
            {navItem.children.map((child, i) => (
              <div className="tree-item-child" key={i}>
                <MenuItem navItem={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <MenuItemHeader navItem={navItem} isOpen={isOpen} handleOpen={handleOpen} />
  );
}

export default function Menu() {
  return (
    <div className="expandable-menu">
      {isabelsTopNav.map((navItem, i) => (
        <MenuItem navItem={navItem} key={`menu-${i}`} defaultIsOpen />
      ))}
    </div>
  );
}
