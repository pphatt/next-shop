import classNames, {ArgumentArray} from "classnames"

export function cn(...inputs: ArgumentArray) {
  return classNames(inputs)
}