import { useCallback } from "react";
import { useNavigate } from "react-router";
import { PagesType } from "../Types/Types";

export const useMyNavigation = () => {
  const navigate = useNavigate();

  const push = useCallback(
    (newPage: PagesType) => {
      document.title = `Podcai | ${newPage}`;
      navigate(`/${newPage}`);
    },
    [, navigate]
  );

  const replace = useCallback(
    (to: PagesType, state: any) => navigate(to, { replace: true, state }),
    [navigate]
  );

  const go = useCallback((delta: PagesType) => navigate(delta), [navigate]);

  const back = useCallback(() => navigate(-1), [navigate]);

  const forward = useCallback(() => navigate(1), [navigate]);

  return {
    back,
    forward,
    go,
    push,
    replace,
  };
};
