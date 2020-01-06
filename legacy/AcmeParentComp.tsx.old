import React from "react";

interface ParentCompProps {
  childComp?: React.ReactNode;
}

const ChildComp: React.FC = () => <h2>This is a child component</h2>;

const ParentComp: React.FC = props => {
  const { childComp } = props;
  return <div>{childComp}</div>;
};

export default function AcmeParentComp() {
  return (
    <>
      <ParentComp childComp={<ChildComp />} />
      <ParentComp childComp={<h3>Child component 2</h3>} />
      <ParentComp
        childComp={
          <div style={{ border: "2px solid red" }}>
            <h4>Child component</h4>
            <p>With multiple children</p>
          </div>
        }
      />
    </>
  );
}
