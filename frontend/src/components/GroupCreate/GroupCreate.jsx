import style from './GroupCreate.module.css';
import { useRef } from 'react';

function GroupCreate() {

    return(
        <div className={style.wrap}>
            <div className={style.groupCreateTop}>
                <h4 style={{margin: '0'}}>그룹 만들기</h4>
                <button>작성</button>
            </div>
            <div className={style.groupCreate}>
                <input type="text" placeholder='그룹명' className={style.title} />
                <input type="password" placeholder='비밀번호' />
                <div className={style.radioBox}>
                    <input type="radio" name="tag" id="radio1" />
                    <label htmlFor="radio1">취업</label>
                    <input type="radio" name="tag" id="radio2" />
                    <label htmlFor="radio2">학업</label>
                    <input type="radio" name="tag" id="radio3" />
                    <label htmlFor="radio3">자격증</label>
                    <input type="radio" name="tag" id="radio4" />
                    <label htmlFor="radio4">운동</label>
                    <input type="radio" name="tag" id="radio5" />
                    <label htmlFor="radio5">게임</label>
                </div>
                <textarea 
                    name="content"
                    className={style.content}
                    placeholder="그룹 소개를 입력하세요."
                    rows="20" 
                    style={{resize: 'none'}}
                />
            </div>
        </div>
    )
}

export default GroupCreate;