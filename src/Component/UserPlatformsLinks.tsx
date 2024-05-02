import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { copyToClipboard } from "../Utils/Utils";
import { snackBarColors, UserType } from "../Types/Types";
import React from "react";

const mainIconSize = "medium";
const mainIconColor = "primary";

type UserPlatformsLinksProps = {
  user: UserType;
  openSnackBar: (message: string, color?: snackBarColors) => void;
};

export const UserPlatformsLinks = ({
  user,
  openSnackBar,
}: UserPlatformsLinksProps) => {
  const copyHandler = async (linkToCopy: string, description: string) => {
    await copyToClipboard(linkToCopy);
    openSnackBar(`${description} copied to clipboard`);
  };

  const platformsArr = [
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
