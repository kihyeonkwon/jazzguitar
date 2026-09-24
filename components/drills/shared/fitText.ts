// 문제 표시는 절대 줄바꿈하지 않는다. 글자 수에 맞춰 컨테이너 폭(cqw)을 채우는 크기를 계산한다.
// 부모에 `@container`(container-type: inline-size)가 있어야 한다.
export function fitSize(text: string, maxRem = 7, fill = 0.94): string {
  const len = Math.max(text.length, 2)
  // Helvetica Black + 좁은 자간 기준 평균 글자 폭 ≈ 0.62em
  const cqw = (fill * 100) / (len * 0.62)
  return `min(${maxRem}rem, ${cqw.toFixed(2)}cqw)`
}
