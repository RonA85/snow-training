// subMenu.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "./sidebarData";
import { User } from "./home"; // Import User interface or type
import { styled } from "styled-components";

const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: #252831;
        border-left: 4px solid #f943ff;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

interface SubMenuProps {
    item: NavItem;
}

const SubMenu: React.FC<SubMenuProps> = ({ item }) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
            navigate(item.path);

    };

    return (
        <>
            <div className="sidebar-item" onClick={handleItemClick}>
                <SidebarLink to={item.path}>
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                </SidebarLink>

            </div>

        </>
    );
}

export default SubMenu;
