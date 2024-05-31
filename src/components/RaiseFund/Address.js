import React, { useRef, useState, useEffect } from "react";
import { globalVariables } from "../../helper/globalVariables";
import { Tag, Space, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function AddressDetails(props) {
  const { setCompanyDetails, companyDetails } = props;
  const [tags, setTags] = useState({});
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const [editInputValueIndex, setEditInputIndexValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    setCompanyDetails({
      ...companyDetails,
      address: tags,
    });
  }, [tags]);

  useEffect(() => {
    if (companyDetails?.address && Object.keys(companyDetails?.address).length) {
      setTags(companyDetails?.address);
    }
  }, [companyDetails]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue) {
      if (!tags.street) {
        setTags({ ...tags, street: inputValue });
      } else if (!tags.city) {
        setTags({ ...tags, city: inputValue });
      } else if (!tags.state) {
        setTags({ ...tags, state: inputValue });
      } else if (!tags.postalCode) {
        setTags({ ...tags, postalCode: inputValue });
      } else if (!tags.country) {
        setTags({ ...tags, country: inputValue });
      } else {
        // Handle the case when all properties are already set
      }
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = tags;
    newTags[editInputValueIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndexValue("");
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    height: 22,
    background: "#fafafa",
    borderStyle: "dashed",
  };
  return (
    <div className="flex justify-between align-middle lg:flex-row flex-col">
      <div>
        <p className="text-gray-700 text-sm mb-1.5 font-medium lg:max-w-[50%]">
          Registered Business Address
        </p>
        <div className="py-2.5 px-4 rounded-md border border-[#d0d5dd] lg:w-[360px] w-[100%]">
          <Space size={[0, 10]} wrap>
            {Object.keys(tags).map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }

              // Determine which property to display based on the tag's index
              const propertyToDisplay =
                index === 0
                  ? "street"
                  : index === 1
                  ? "city"
                  : index === 2
                  ? "state"
                  : index === 3
                  ? "postalCode"
                  : index === 4
                  ? "country"
                  : null;

              if (propertyToDisplay) {
                return (
                  <Tag
                    key={tag}
                    style={{
                      userSelect: "none",
                    }}
                  >
                    <span
                      key={Math.random()}
                      onDoubleClick={(e) => {
                        setEditInputIndex(index);
                        setEditInputIndexValue(propertyToDisplay);
                        setEditInputValue(tags[propertyToDisplay]);
                        e.preventDefault();
                      }}
                    >
                      {tags[propertyToDisplay]}
                    </span>
                  </Tag>
                );
              }

              return null; // Return null if propertyToDisplay is not found
            })}
            {Object.keys(tags).length < 5 ? (
              inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag
                  style={tagPlusStyle}
                  icon={<PlusOutlined />}
                  onClick={showInput}
                >
                  {!tags.street
                    ? "Street"
                    : !tags.city
                    ? "City"
                    : !tags.state
                    ? "State"
                    : !tags.postalCode
                    ? "Postal Code"
                    : !tags.country
                    ? "Country"
                    : "All Properties Set"}
                </Tag>
              )
            ) : null}
          </Space>
        </div>
      </div>
      <p className="text-[#777777] w-[100%] lg:w-[50%] pt-6 lg:pt-8 font-normal text-[13px] ">
        {globalVariables.registerBusinessdesc}
      </p>
    </div>
  );
}
