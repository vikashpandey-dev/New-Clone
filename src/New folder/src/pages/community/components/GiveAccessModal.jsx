import React, { useEffect, useState } from "react";
import {
  InputLeftElement,
  Input,
  InputGroup,
  Avatar,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import { Stack } from "@chakra-ui/react";
import { GetUSers } from "../../../api/users";
import ReactPaginate from "react-paginate";

const GiveAccessModal = (props) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const handleCheckboxChange = (checkedValue) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(checkedValue)) {
        return prevSelected.filter((value) => value !== checkedValue);
      } else {
        return [...prevSelected, checkedValue];
      }
    });
  };
  useEffect(() => {
    // alert("dskljdklsj")
    const payload = {
      Search: search,
      // allowpost:"false"
    };
    props.GetUSerAPI(payload);
  }, [search]);
  useEffect(() => {
    props.passuserid(selectedCheckboxes);
  }, [selectedCheckboxes]);
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(props.usersdata.map((option) => option.UserID));
    }
    setSelectAll(!selectAll);
  };

  const handlePageClick = (data) => {};

  return (
    <>
      <div className="modal-container">
        <p className="modal-body-header text-md font-bold">Select Users</p>
        <InputGroup className="w-1/5 mt-2">
          <InputLeftElement pointerEvents="none" height="10">
            <FiSearch color="inherit" height="10" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Name, Email, ID, MobileNo"
            height="10"
            className="h-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </div>
      <Checkbox
        className="mt-2"
        isChecked={selectAll}
        onChange={handleSelectAllChange}
      >
        Select all
      </Checkbox>
      <div className="">
        {props ? (
          props.usersdata.length > 0 ? (
            props.usersdata.map((val, index) => {
              return (
                <>
                  {val.UserID ? (
                    <div
                      className="px-2 py-3 my-2 flex gap-3 w-full"
                      key={index}
                    >
                      <div className="flex gap-3">
                        <CheckboxGroup value={selectedCheckboxes}>
                          <Stack spacing={[1, 5]} direction={["column", "row"]}>
                            <Checkbox
                              className="custom-check"
                              key={val.UserID}
                              value={val.UserID}
                              onChange={() => handleCheckboxChange(val.UserID)}
                            />
                          </Stack>
                        </CheckboxGroup>
                        <Avatar
                          size="md"
                          name="Dan Abrahmov"
                          src="https://bit.ly/dan-abramov"
                        />
                      </div>
                      {console.log(val)}
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <p className="text-base font-semibold">
                            {val.FirstName} {val.LastName}
                          </p>
                        </div>
                        <span className="text-sm text-grey font-medium">
                          {val.MobileNo}&nbsp;&nbsp;|&nbsp;&nbsp;
                        </span>
                        {val.allowPost ? (
                          <>
                            {val.allowPost.trim() == "true" ? (
                              <span className="text-sm  font-medium text-red-600">
                                Remove
                                {/* {val.EMail1 || val.EMail2 } */}
                              </span>
                            ) : (
                              <span className="text-sm text-green font-medium">
                                Give
                                {/* {val.EMail1 || val.EMail2 } */}
                              </span>
                            )}
                          </>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })
          ) : (
            <div className="">USers Not Available</div>
          )
        ) : (
          <div className="">USers Not Available</div>
        )}
      </div>
      {/* <ReactPaginate
        previousLabel={"<<"}
        className="flex justify-end"
        nextLabel={">>"}
        breakLabel={"..."}
        pageCount={5}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      /> */}
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    GetUSerAPI: (payload) => dispatch(GetUSers(payload)),
  };
};
const mapStateToProps = (state, props) => {
  return {
    usersdata: state?.users?.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiveAccessModal);
