import api from '../api/api';

export const handleGroupAccess = async (group, category, navigate) => {
  if (group.isPrivate) {
    const input = prompt("비밀번호를 입력해주세요");
    if (!input) return;

    try {
      const res = await api.post('/groups/check-password', {
        groupId: group.id,
        password: input,
      });

      if (res.data === true) {
        navigate(`/post/${group.id}${category ? `?category=${category}` : ''}`);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error("비밀번호 확인 실패:", err);
    }
  } else {
    navigate(`/post/${group.id}${category ? `?category=${category}` : ''}`);
  }
};