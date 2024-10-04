import * as styled from "./Loader.styled";

// Loader takes a parameter that has a boolean type and that is false by default
export default function Loader({ global = false }: { global?: boolean }) {
  return global ? ( // if global is true, return the global element
    <styled.GlobalLoaderWrapper>
      <styled.Loader />
    </styled.GlobalLoaderWrapper>
  ) : ( // if false return the local Loader
    <styled.Loader />
  );
}
