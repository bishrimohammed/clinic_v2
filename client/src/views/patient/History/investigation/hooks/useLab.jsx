import React, { useState } from "react";

export const useLab = () => {
  const [selectedTests, setSelectedTests] = useState([]);

  // Add a handler to toggle a test selected state
  const toggleTest = (test) => {
    const index = selectedTests.findIndex((t) => t.id === test.id);
    if (index === -1) {
      setSelectedTests([...selectedTests, test]);
    } else {
      setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
    }
  };
};
