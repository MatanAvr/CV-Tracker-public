import React from "react";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { copyToClipboard } from "../Utils/Utils";
import { SnackBarColorsType, UserType } from "../Types/Types";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const mainIconSize = "medium";
const mainIconColor = "primary";

type UserLinksProps = {
  user: UserType;
  openSnackBar: (message: string, color?: SnackBarColorsType) => void;
};

export const UserLinks = ({ user, openSnackBar }: UserLinksProps) => {
  const copyHandler = async (linkToCopy: string, description: string) => {
    await copyToClipboard(linkToCopy);
    openSnackBar(`${description} copied to clipboard`);
  };

  const platformsArr = [
    {
      icon: <EmailRoundedIcon fontSize={mainIconSize} color={mainIconColor} />,
      description: "Email address",
      link: user.email,
    },
    {
      icon: <LinkedInIcon fontSize={mainIconSize} color={mainIconColor} />,
      description: "Linkedin profile link",
      link: user.linkedinLink,
    },
    {
      icon: <GitHubIcon fontSize={mainIconSize} color={mainIconColor} />,
      description: "GitHub profile link",
      link: user.githubLink,
    },
    {
      icon: (
        <LanguageRoundedIcon fontSize={mainIconSize} color={mainIconColor} />
      ),
      description: "Personal website link",
      link: user.personalWebsiteLink,
    },
  ];

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={1}
    >
      <Box display={"flex"} gap={1}>
        {platformsArr.map((platform, index) => {
          return platform.link ? (
            <Box
              key={`platform-link-wrapper-${index}`}
              display={"flex"}
              alignItems={"center"}
              gap={0.5}
            >
              <Tooltip title="Click to copy">
                <IconButton
                  onClick={() =>
                    copyHandler(platform.link, platform.description)
                  }
                >
                  {platform.icon}
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem />
            </Box>
          ) : (
            <React.Fragment key={index} />
          );
        })}
      </Box>
    </Box>
  );
};
