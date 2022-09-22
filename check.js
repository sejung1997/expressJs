import react, { useEffect, useState, useRef } from "react";
const dataSource = {
  title: "소비자권익보호에 관한 사항",
  des1: '당사와의 여신(금융)거래와 관련하여 귀하의 개인(신용)정보를 수집이용하거나 제3자에게 제공 및 제3자가 조회하고자 하는 경우에는 「신용정보의 이용 및 보호에 관한 법률」,「개인정보보호법」등 관계 법령에 따라 귀하의 동의가 필요합니다. 귀하는 동의를 거부하실 수 있습니다. 다만 위 개인(신용)정보 조회에 관한 동의는 "(금융)거래 체결 및 이행을 위한" 필수적 사항이므로, 위 사항에 동의하셔야만 (금융)거래관계의 설정 및 유지가 가능합니다.',
  des2: "서울보증보험(주) 귀중 귀하는 개인(신용)정보의 수집 · 이용 및 조회, 제공에 관한 동의를 거부하실 수 있으며, 개인의 신용도 등을 평가하기 위한 목적 이외의 개인(신용)정보 제공동의는 철회할 수 있습니다. 다만 본 동의는 '보험계약 인수심사 · 체결 · 이행 · 유지 · 관리를 위해 필수적인 사항이므로 동의를 거부하시는 경우 관련 업무 수행이 불가능 합니다. 또한 본 동의서에 의한 개인(신용)정보 조회는 귀하의 개인신용평점에 영향을 주지 않습니다.(다만 귀하의 개인신용평점이 존재하지 않는 경우는 제외 합니다)",
};

const checkData = [
  {
    title: "[필수] 개인(신용)정보 조회 동의",
    child: [
      {
        title: "수집 · 이용에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "제공에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "조회에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
    ],
    child2: [
      {
        title: "수집 · 이용에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "제공에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
    ],
  },
  {
    title: "[필수] 개인(신용)정보 수집·이용 ·제공동의(여신금융거래)",

    child: [
      {
        title: "수집 · 이용에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "제공에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "조회에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
    ],
    child2: [
      {
        title: "수집 · 이용에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "제공에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
    ],
  },

  {
    title: "[필수] 계약 체결 · 이행을 위한 동의 (개인금융성 신용보험)",
    child: [
      {
        title: "수집 · 이용에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "제공에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
      {
        title: "조회에 관한 사항",
        child: ["고유식별 정보", "개인(신용)정보"],
      },
    ],
  },
  {
    title: "[필수] 휴대폰 본인인증을 위한 동의",
    child: [
      {
        title: "개인(신용)정보의 수집 및 이용에 관한 사항",
      },
      {
        title: "고유식별정보의 처리에 관한 사항",
      },
      {
        title: "통신사 이용약관 동의",
      },
      {
        title: "서비스 이용약관 동의",
      },
    ],
  },
];
// const setInitialState = (checkData) => {
//   return checkData.map((el) => {
//     const temp = {
//       checked: false,
//     };
//     if (el.child) temp.child = setInitialState(el.child);
//     if (el.child2) temp.child2 = setInitialState(el.child2);

//     return temp;
//   });
// };
export default function Check() {
  // const [checked, setChecked] = useState(setInitialState(checkData));
  const [isFirstChild, setIsFirstChild] = useState(
    new Array(checkData.filter((el) => el.child2).length).fill(true)
  );
  const allCheckRef = useRef(null);
  const checkRef = useRef([]);
  const checkRef1 = useRef();
  const checkRef2 = useRef();

  checkRef1.current = Array.from(Array(checkData.length), () => []);
  checkRef2.current = Array.from(Array(checkData.length), (v, i) =>
    Array.from(
      Array(
        checkData[i].child.length +
          (checkData[i].child2 ? checkData[i].child2?.length : 0)
      ),
      () => []
    )
  );
  const allCheckRefEvent = (node) => {
    const boolean = node.target.checked;
    checkRef.current.forEach((ref, index) => {
      ref.checked = boolean;
      checkRef1.current[index].forEach((ref1, index1) => {
        ref1.checked = boolean;
        checkRef2.current[index][index1].forEach((ref2, index2) => {
          ref2.checked = boolean;
        });
      });
    });
  };
  const checkRefEvent = (index) => (node) => {
    console.log("ref changed");
    const boolean = node.target.checked;

    if (checkRef.current.every((el) => el.checked))
      allCheckRef.current.checked = true;
    if (checkRef.current.some((el) => !el.checked))
      allCheckRef.current.checked = false;
    checkRef1.current[index].forEach((ref1, index1) => {
      ref1.checked = boolean;
      checkRef2.current[index][index1].forEach((ref2, index2) => {
        ref2.checked = boolean;
      });
    });
  };

  const checkRef1Event = (index, index1) => (node) => {
    console.log("ref1 changed");
    const boolean = node.target.checked;

    if (checkRef1.current[index].every((el) => el.checked)) {
      checkRef.current[index].checked = true;
      if (checkRef.current.every((el) => el.checked))
        allCheckRef.current.checked = true;
    }
    if (checkRef1.current[index].some((el) => !el.checked)) {
      checkRef.current[index].checked = false;
      if (checkRef.current.some((el) => !el.checked))
        allCheckRef.current.checked = false;
    }
    checkRef2.current[index][index1].forEach((ref2, index2) => {
      ref2.checked = boolean;
    });
  };
  const checkRef2Event = (index, index1, index2) => (node) => {
    console.log("ref2 changed");
    if (checkRef2.current[index][index1].every((el) => el.checked)) {
      checkRef1.current[index][index1].checked = true;
      if (checkRef1.current[index].every((el) => el.checked)) {
        checkRef.current[index].checked = true;
        if (checkRef.current.every((el) => el.checked))
          allCheckRef.current.checked = true;
      }
    }
    if (checkRef2.current[index][index1].some((el) => !el.checked)) {
      checkRef1.current[index][index1].checked = false;
      if (checkRef1.current[index].some((el) => !el.checked)) {
        checkRef.current[index].checked = false;
        if (checkRef.current.some((el) => !el.checked))
          allCheckRef.current.checked = false;
      }
    }
  };

  useEffect(() => {
    if (
      allCheckRef?.current &&
      checkRef?.current &&
      checkRef1?.current &&
      checkRef2?.current
    ) {
      allCheckRef.current.addEventListener("click", allCheckRefEvent);
      checkRef.current.forEach((ref, index) => {
        ref.addEventListener("change", checkRefEvent(index));
        checkRef1.current[index].forEach((ref1, index1) => {
          ref1.addEventListener("change", checkRef1Event(index, index1));
          checkRef2.current[index][index1].forEach((ref2, index2) => {
            ref2.addEventListener(
              "change",
              checkRef2Event(index, index1, index2)
            );
          });
        });
      });
    }

    return () => {
      allCheckRef.current.removeEventListener("click", allCheckRefEvent);
      checkRef.current.forEach((ref, index) => {
        ref.removeEventListener("change", checkRefEvent);
        checkRef1.current[index].forEach((ref1, index1) => {
          ref1.removeEventListener("change", checkRef1Event(index, index1));
          checkRef2.current[index][index1].forEach((ref2, index2) => {
            ref2.removeEventListener(
              "change",
              checkRef2Event(index, index1, index2)
            );
          });
        });
      });
    };
  }, []);
  const changeChild2 = (i, boolean) => () => {
    const temp = [...isFirstChild];
    temp[i] = boolean;
    console.log(i, boolean);
    setIsFirstChild(temp);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <input type="checkbox" ref={allCheckRef} />
        필수약간 전체동의
        {/* <h1>{dataSource.title}</h1> */}
        {/* <span>{dataSource.des1}</span> */}
        {checkData.map((el, index) => (
          <div key={index}>
            <h2>
              <input
                ref={(el) => (checkRef.current[index] = el)}
                type="checkbox"
              />
              {el.title}
            </h2>
            {el.child2 && (
              <>
                <button
                  style={{
                    border: "none",
                    backgroundColor: isFirstChild[index] ? "orange" : "",
                  }}
                  onClick={changeChild2(index, true)}
                >
                  요약동의서
                </button>
                <button
                  style={{
                    border: "none",
                    backgroundColor: isFirstChild[index] ? "" : "orange",
                  }}
                  onClick={changeChild2(index, false)}
                >
                  상세동의서
                </button>
              </>
            )}

            {el.child.map((el1, index1) => (
              <div
                key={el1}
                style={{
                  textIndent: "25px",
                  display: isFirstChild[index] || !el.child2 ? "block" : "none",
                }}
              >
                <h3>
                  <input
                    type="checkbox"
                    ref={(el) => (checkRef1.current[index][index1] = el)}
                  />
                  {el1.title}
                </h3>

                {el1.child?.map((el2, index2) => (
                  <div key={el2} style={{ textIndent: "50px" }}>
                    <input
                      type="checkbox"
                      ref={(el) =>
                        (checkRef2.current[index][index1][index2] = el)
                      }
                    />
                    {el2}
                  </div>
                ))}
              </div>
            ))}
            {el.child2?.map((el1, index1) => (
              <div
                key={el1}
                style={{
                  textIndent: "25px",
                  display: isFirstChild[index] ? "none" : "block",
                }}
              >
                <h3>
                  <input
                    type="checkbox"
                    ref={(ref) =>
                      (checkRef1.current[index][el.child?.length + index1] =
                        ref)
                    }
                  />
                  {el1.title}
                </h3>
                {el1.child?.map((el2, index2) => (
                  <div key={el2} style={{ textIndent: "50px" }}>
                    <input
                      type="checkbox"
                      ref={(ref) =>
                        (checkRef2.current[index][el.child?.length + index1][
                          index2
                        ] = ref)
                      }
                    />
                    {el2}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        {/* <h1>{dataSource.title}</h1> */}
        {/* <span>{dataSource.des2}</span> */}
      </div>
    </div>
  );
}
